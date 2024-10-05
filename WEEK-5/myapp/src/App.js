import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Confirmation from './components/Confirmation';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
  </Router>
);

export default App;
