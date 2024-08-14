// src/components/BuyersPage.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setBuyers(data.buyers))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Buyers</h1>
      <ul>
        {buyers.map(buyer => (
          <li key={buyer.id}>
            <h2>{buyer.name}</h2>
            <p>Contact: {buyer.contact.phone} | {buyer.contact.email}</p>
            <p>Address: {buyer.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buyers;
