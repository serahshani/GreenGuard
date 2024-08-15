import React, { useEffect, useState } from 'react';

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch buyers data
    fetch('/buyers.json')
      .then(response => response.json())
      .then(data => setBuyers(data.buyers))
      .catch(error => console.error('Error fetching buyers data:', error));

    // Fetch farmers data
    fetch('/farmers.json')
      .then(response => response.json())
      .then(data => setFarmers(data.farmers))
      .catch(error => console.error('Error fetching farmers data:', error));
  }, []);

  useEffect(() => {
    if (buyers.length > 0 && farmers.length > 0) {
      // Match surplus produce with demand
      const matchedData = farmers.flatMap(farmer => 
        farmer.produce.map(produce => {
          const matchedBuyers = buyers.filter(buyer => 
            buyer.demand.some(demand => demand.product === produce.product && demand.quantity <= produce.quantity)
          );
          return matchedBuyers.map(buyer => ({
            farmer: farmer.name,
            product: produce.product,
            quantity: produce.quantity,
            buyer: buyer.name,
            buyerContact: buyer.contact,
            buyerAddress: buyer.address
          }));
        })
      ).flat();
      setMatches(matchedData);
    }
  }, [buyers, farmers]);

  return (
    <div>
      <h1>Matched Buyers and Farmers</h1>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <h2>Farmer: {match.farmer}</h2>
            <p>Product: {match.product}</p>
            <p>Quantity: {match.quantity}</p>
            <h3>Buyer: {match.buyer}</h3>
            <p>Contact: {match.buyerContact.phone} | {match.buyerContact.email}</p>
            <p>Address: {match.buyerAddress}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buyers;