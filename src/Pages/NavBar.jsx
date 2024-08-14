// src/components/Navbar.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/farmers">Farmers</Link></li>
        <li><Link to="/buyers">Buyers</Link></li>
        <li><Link to="/products">Farm Products</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
