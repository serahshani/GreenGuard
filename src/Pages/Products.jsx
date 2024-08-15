// src/components/ProductsPage.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/buyers')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Farm Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>Type: {product.type}</p>
            <p>Price: ${product.price_per_unit.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
