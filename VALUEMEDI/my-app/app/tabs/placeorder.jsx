import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const products = [
  { id: '1', name: 'Dolo-650 TAB 1X15', price: 24.0, supplier: 'Micro Labs', mrp: 33.6, available: 88 },
  { id: '2', name: 'Dologel CT CREAM 1X10GM', price: 73.57, supplier: 'Dr. Reddy’s Recura', mrp: 103.0, available: 8 },
  { id: '3', name: 'Doloneuron-300MG 1X10', price: 133.57, supplier: 'Pulse', mrp: 187.0, available: 8 },
  { id: '4', name: 'Dolopar TAB 1X15', price: 41.43, supplier: 'Micronova', mrp: 57.8, available: 8 },
  { id: '5', name: 'Dolostat MR TAB 1X10', price: 35.74, supplier: 'Gold Cross Labs', mrp: 49.8, available: 62 },
  { id: '6', name: 'Dolostat SP TAB 1X10', price: 38.57, supplier: 'Gold Cross Labs', mrp: 52.5, available: 88 },
  { id: '7', name: 'Dolostat+R CAPS 1X10', price: 55.71, supplier: 'Gold Cross Labs', mrp: 78.5, available: 88 },
  { id: '8', name: 'Dolostat-PC 1X12ML', price: 34.47, supplier: 'Troikaa Pharmaceuticals', mrp: 47.5, available: 175 },
];

export default function PlaceOrder() 
{
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = () => {
    if (selectedProduct && quantity) {
      const productInCart = {
        ...selectedProduct,
        quantity: parseInt(quantity, 10),
        total: selectedProduct.price * parseInt(quantity, 10),
      };
      setCart([...cart, productInCart]);
      setModalVisible(false);
      setQuantity('');
    }
  };

  const totalOrderValue = cart.reduce((sum, item) => sum + item.total, 0);

  const goToViewCart = () => {
    router.push('/tabs/viewcart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search product..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>₹ {item.price.toFixed(2)} MRP {item.mrp.toFixed(2)}</Text>
            <Text style={styles.productDetails}>Supplier: {item.supplier}</Text>
            <Text style={styles.productDetails}>Available: {item.available} pcs</Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => { setSelectedProduct(item); setModalVisible(true); }}
            >
              <Text style={styles.plusButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <Text style={styles.totalOrderText}>Total Order Value: ₹ {totalOrderValue.toFixed(2)}</Text>
        <TouchableOpacity style={styles.viewCartButton} onPress={goToViewCart}>
          <Text style={styles.buttonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0FDFE' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
  },
  productItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  productDetails: { fontSize: 14, color: '#666', marginVertical: 2 },
  addButton: {
    backgroundColor: '#00BFB8',
    padding: 12,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  addToCartButton: {
    backgroundColor: '#00BFB8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#FF5C5C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    alignItems: 'center',
  },
  totalOrderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  viewCartButton: {
    backgroundColor: '#FF5C5C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
