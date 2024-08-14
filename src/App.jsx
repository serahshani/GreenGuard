// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/NavBar';
import HomePage from './Pages/Home';
import FarmersPage from './Pages/Farmers';
import BuyersPage from './Pages/Buyers';
import ProductsPage from './Pages/Products';
import './App.css';

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
=======
    <>
      <div>
       
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
>>>>>>> 6376b95b4eeaeecf95ed2282e4d9c412123f7b71
      </div>
    </Router>
  );
}

export default App;
