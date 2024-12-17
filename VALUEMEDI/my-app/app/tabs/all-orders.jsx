import React, { useState } from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Modal,TextInput,Picker,Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const orders = [
  { id: '1000001', name: 'Order #1', date: '2024-11-25 10:30 AM', total: '₹5000', status: 'Received' },
  { id: '1000002', name: 'Order #2', date: '2024-11-26 2:45 PM', total: '₹10000', status: 'Cancelled' },
  { id: '1000003', name: 'Order #3', date: '2024-11-27 8:00 AM', total: '₹7500', status: 'Processing' },
  { id: '1000004', name: 'Order #4', date: '2024-11-28 1:00 PM', total: '₹12000', status: 'Invoiced' },
  { id: '1000005', name: 'Order #5', date: '2024-11-29 3:15 PM', total: '₹4500', status: 'Received' },
  { id: '1000006', name: 'Order #6', date: '2024-11-30 5:45 PM', total: '₹9800', status: 'Processing' },
];

// const display = async() =>{
//   try{
//     const data = await axios.get('https://gamma.valuemedi.com/api/v1/order/find-orders?query=PRAGATHI&page=0&size=10&statusIds=1&statusIds=4&startDate=2024-11-01&endDate=2024-11-22')
//     if(data.status==200)
//     {
//       console.log('succ')
//     }
//   }
// }

export default function AllOrders() 
{
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateFilterType, setDateFilterType] = useState('Today');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;

    const orderDate = new Date(order.date);
    const isWithinDateRange =
      dateFilterType === 'Today'
        ? orderDate.toDateString() === new Date().toDateString()
        : dateFilterType === 'Last 7 Days'
        ? orderDate >= new Date(new Date().setDate(new Date().getDate() - 7))
        : dateFilterType === 'Last 30 Days'
        ? orderDate >= new Date(new Date().setDate(new Date().getDate() - 30))
        : orderDate >= startDate && orderDate <= endDate;

    return matchesSearch && matchesStatus && isWithinDateRange;
  });

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Orders</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by Order ID, Product, or Supplier Name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filters}>
        <Picker
          selectedValue={dateFilterType}
          style={styles.picker}
          onValueChange={(itemValue) => setDateFilterType(itemValue)}
        >
          <Picker.Item label="Today" value="Today" />
          <Picker.Item label="Last 7 Days" value="Last 7 Days" />
          <Picker.Item label="Last 30 Days" value="Last 30 Days" />
          <Picker.Item label="Custom Date Range" value="Custom" />
        </Picker>

        {dateFilterType === 'Custom' && (
          <View style={styles.dateRange}>
            <Button title="Start Date" onPress={() => setShowDatePicker('start')} />
            <Button title="End Date" onPress={() => setShowDatePicker('end')} />
          </View>
        )}

        <Picker
          selectedValue={filterStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterStatus(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Received" value="Received" />
          <Picker.Item label="Processing" value="Processing" />
          <Picker.Item label="Cancelled" value="Cancelled" />
          <Picker.Item label="Invoiced" value="Invoiced" />
        </Picker>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={showDatePicker === 'start' ? startDate : endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (showDatePicker === 'start') {
              setStartDate(selectedDate || startDate);
            } else {
              setEndDate(selectedDate || endDate);
            }
          }}
        />
      )}

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderItem} onPress={() => openOrderDetails(item)}>
            <Text style={styles.orderName}>{item.name}</Text>
            <Text style={styles.orderDetails}>Date: {item.date}</Text>
            <Text style={styles.orderDetails}>Total: {item.total}</Text>
            <Text style={styles.orderDetails}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details</Text>
            {selectedOrder ? (
              <>
                <Text style={styles.modalText}>Name: {selectedOrder.name}</Text>
                <Text style={styles.modalText}>Date: {selectedOrder.date}</Text>
                <Text style={styles.modalText}>Total: {selectedOrder.total}</Text>
                <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
              </>
            ) : (
              <Text>No order selected.</Text>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
    marginBottom: 10,
    color: '#00BFB8', 
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderColor: '#00BFB8', 
    borderWidth: 1,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    marginHorizontal: 5,
    color: '#00BFB8', 
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderLeftWidth: 4, 
    borderColor: '#00BFB8', 
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFB8', 
  },
  orderDetails: {
    fontSize: 14,
    color: '#333', 
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
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00BFB8', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

