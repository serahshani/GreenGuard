import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    source: '',
    nutrients: {
      nitrogen: '',
      phosphorus: '',
      potassium: ''
    },
    release_rate: '',
    description: ''
  });

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setProducts(data.manures))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in newProduct.nutrients) {
      setNewProduct({
        ...newProduct,
        nutrients: {
          ...newProduct.nutrients,
          [name]: value
        }
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({
      name: '',
      source: '',
      nutrients: {
        nitrogen: '',
        phosphorus: '',
        potassium: ''
      },
      release_rate: '',
      description: ''
    });
  };

  return (
    <div>
      <h1>Manures</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="source"
          value={newProduct.source}
          onChange={handleChange}
          placeholder="Source"
          required
        />
        <input
          type="number"
          name="nitrogen"
          value={newProduct.nutrients.nitrogen}
          onChange={handleChange}
          placeholder="Nitrogen (%)"
          required
        />
        <input
          type="number"
          name="phosphorus"
          value={newProduct.nutrients.phosphorus}
          onChange={handleChange}
          placeholder="Phosphorus (%)"
          required
        />
        <input
          type="number"
          name="potassium"
          value={newProduct.nutrients.potassium}
          onChange={handleChange}
          placeholder="Potassium (%)"
          required
        />
        <input
          type="text"
          name="release_rate"
          value={newProduct.release_rate}
          onChange={handleChange}
          placeholder="Release Rate"
          required
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Add Manure</button>
      </form>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Source: {product.source}</p>
            <p>Nitrogen: {product.nutrients.nitrogen}%</p>
            <p>Phosphorus: {product.nutrients.phosphorus}%</p>
            <p>Potassium: {product.nutrients.potassium}%</p>
            <p>Release Rate: {product.release_rate}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
