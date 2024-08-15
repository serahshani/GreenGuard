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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/manures')
      .then(response => response.json())
      .then(data => setProducts(data))
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
    alert('Manure added successfully!');
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
    setShowForm(false);
  };

  return (
    <div>
      <h1 style={{ color: '#067608', paddingLeft: '500px' }}>Manures</h1>
      <button onClick={() => setShowForm(true)} style={{
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#28a745',
        color: 'white',
        cursor: 'pointer',
        transition: '0.6s',
        display: 'block',
        margin: '20px auto'
      }}>Add Manure</button>
      {showForm && (
        <div className="form-container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <form className="form-1" onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
            backgroundColor: '#ffff',
            width: '700px',
            padding: '20px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Name"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <input
              type="text"
              name="source"
              value={newProduct.source}
              onChange={handleChange}
              placeholder="Source"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <input
              type="number"
              name="nitrogen"
              value={newProduct.nutrients.nitrogen}
              onChange={handleChange}
              placeholder="Nitrogen (%)"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <input
              type="number"
              name="phosphorus"
              value={newProduct.nutrients.phosphorus}
              onChange={handleChange}
              placeholder="Phosphorus (%)"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <input
              type="number"
              name="potassium"
              value={newProduct.nutrients.potassium}
              onChange={handleChange}
              placeholder="Potassium (%)"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <input
              type="text"
              name="release_rate"
              value={newProduct.release_rate}
              onChange={handleChange}
              placeholder="Release Rate"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Description"
              required
              style={{
                padding: '8px',
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            <button type="submit" style={{
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#28a745',
              color: 'white',
              cursor: 'pointer',
              transition: '0.6s',
              display: 'block',
              margin: '20px auto'
            }}>Add Manure</button>
            <button type="button" onClick={() => setShowForm(false)} style={{
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#28a745',
              color: 'white',
              cursor: 'pointer',
              transition: '0.6s',
              display: 'block',
              margin: '20px auto'
            }}>Cancel</button>
          </form>
        </div>
      )}
      <div className="product-list" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        color: '#131512',
        paddingLeft: '90px'
      }}>
        {products.map(product => (
          <div key={product.id} className="product-card" style={{
            border: '1px solid #ddd',
            borderRadius: '11px',
            padding: '16px',
            width: '200px',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(250, 250, 250, 0.6)',
            zIndex: 1
          }}>
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

export default Products