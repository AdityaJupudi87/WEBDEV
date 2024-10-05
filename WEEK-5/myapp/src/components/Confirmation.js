// the main role of this page is to show the new product details and ask for confirmation
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import axios from 'axios';

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const confirmProduct = () => {
    axios.post('https://dummyjson.com/products/add', product)
      .then(() => navigate('/'));
      
  };

  // this executes when product variable is undefined and prevents errors by not accessing the undefined 
  if (!product) return <p>No product details</p>;
 
  // if valid product details are there
  return (
    <div style={styles.container}>
    <h2 style={styles.header}>Confirm Product Details</h2>
    <Card title="Product Information" style={{ width: 300, margin: 'auto', marginBottom: 20 }}>
      <p><strong>Title:</strong> {product.title}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
    </Card>
    <Button type="primary" style={styles.confirmButton} onClick={confirmProduct}>
      Confirm
    </Button>
  </div>
  );
}
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    color: '#1890ff',
    marginBottom: '20px',
  },
  confirmButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    width: '100%',
  },
};