// src/components/FarmersPage.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/buyers')
      .then(response => response.json())
      .then(data => setFarmers(data.farmers))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Farmers</h1>
      <ul>
        {farmers.map(farmer => (
          <li key={farmer.id}>
            <h2>{farmer.name}</h2>
            <p>Contact: {farmer.contact.phone} | {farmer.contact.email}</p>
            <p>Farm: {farmer.farm.name}, {farmer.farm.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Farmers;
