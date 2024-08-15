// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/farmers">Farmers</Link></li>
        <li><Link to="/buyers">Buyers</Link></li>
        <li><Link to="/products">Manures</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;