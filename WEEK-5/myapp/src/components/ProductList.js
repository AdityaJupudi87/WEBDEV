import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Table, Modal, Button, Form } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const today = moment(); // current date
  const lastWeek = moment().subtract(7, 'days'); // date 7 days ago

  useEffect(() => {
    axios.get('https://dummyjson.com/products') // fetching data of products using axios
      .then(res => {
        setProducts(res.data.products);
        setFiltered(res.data.products);
      });
  }, []);

  const searchProducts = (value) => {
    const filteredList = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase()) // converting the user typed string to lower case and comparing with the product name in lower case
    );
    setFiltered(filteredList);
  };

  const openModal = () => setModalVisible(true); // visible
  const closeModal = () => setModalVisible(false); // closed

  const submitProduct = (values) => {
    navigate('/confirmation', { state: { product: values } }); // navigates to confirmation page
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
  ];

  return (
    <div style={styles.container}> 
       <h1 style={styles.header}>Products</h1>

      <DatePicker.RangePicker
        defaultValue={[lastWeek, today]}
        style={styles.datePicker}
      />

      <Input.Search
        placeholder="Enter product"
        onSearch={searchProducts}
        style={styles.searchInput}
      />

      <Table dataSource={filtered} columns={columns} style={styles.table}  />

      <Button type="primary" onClick={openModal} style={styles.addButton}>
        Add Product
      </Button>

     {/* EVERYTHING REQUIRED FOR ADDING A NEW PRODUCT  */}
      <Modal title="New Product Details" visible={modalVisible} onCancel={closeModal} footer={null} style={styles.modal}>
        <Form onFinish={submitProduct}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={styles.submitButton}>Submit</Button>
        </Form>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#1890ff',
  },
  datePicker: {
    marginBottom: '20px',
    width: '100%',
  },
  searchInput: {
    width: '200px',
    marginBottom: '20px',
  },
  table: {
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#52c41a',
    borderColor: '#52c41a',
  },
  modal: {
    top: '20%',
  },
  submitButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    width: '100%',
  },
};