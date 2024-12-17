import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';

const cartItems = [
  { id: 'p1', name: 'Product 1', price: 500, quantity: 1 },
  { id: 'p2', name: 'Product 2', price: 1000, quantity: 2 },
  { id: 'p3', name: 'Product 3', price: 750, quantity: 1 },
  { id: 'p4', name: 'Product 4', price: 1500, quantity: 3 },
  { id: 'p5', name: 'Product 5', price: 450, quantity: 2 },
];

export default function ViewCart() {
  const [cart, setCart] = useState(cartItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
    setQuantity(item.quantity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const updateQuantity = () => {
    setCart(
      cart.map(item =>
        item.id === selectedItem.id ? { ...item, quantity } : item
      )
    );
    closeModal();
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemDetails}>Price: ₹{item.price}</Text>
            <Text style={styles.cartItemDetails}>Quantity: {item.quantity}</Text>
            <Text style={styles.cartItemDetails}>Total: ₹{item.price * item.quantity}</Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => openItemDetails(item)}
            >
              <Text style={styles.updateButtonText}>Update Quantity</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
      </View>


      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Quantity</Text>

            <TextInput
              style={styles.quantityInput}
              value={String(quantity)}
              onChangeText={(text) => setQuantity(Number(text))}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={updateQuantity}>
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00BFB8',
  },
  cartItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFB8',
  },
  cartItemDetails: {
    fontSize: 14,
    color: '#333',
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  updateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#00BFB8',
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00BFB8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00BFB8',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00BFB8',
  },
  quantityInput: {
    height: 40,
    borderColor: '#00BFB8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#00BFB8',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
