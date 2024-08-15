// src/App.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Pages/NavBar';
import HomePage from './Pages/Home';
import FarmersPage from './Pages/Farmers';
import BuyersPage from './Pages/Buyers';
import ProductsPage from './Pages/Products';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
