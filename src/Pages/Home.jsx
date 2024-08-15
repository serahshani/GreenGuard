import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price_per_unit: '',
    farmer_id: '',
    image_url: '',
    description: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(() => {
      
      fetchProducts();
      toast.success('Product added successfully!'); 
    })
    .catch(error => {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.'); 
    });

    
    setNewProduct({
      name: '',
      type: '',
      price_per_unit: '',
      farmer_id: '',
      image_url: '',
      description: ''
    });
    setIsModalOpen(false);
  };

  const sortedProducts = products.slice().sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    return 0;
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid grey',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid grey',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '200px',
    textAlign: 'center'
  };

  const imgStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px'
  };

  // Modal styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '500px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    position: 'relative'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '30px',
    textAlign: 'center'
  };

  const headerStyle = {
    backgroundImage: 'url("https://media.istockphoto.com/id/1193489879/photo/counter-with-fresh-vegetables-and-a-sign-of-local-products.jpg?s=2048x2048&w=is&k=20&c=S2ZrZqmzx8G4sgiic3ljJFhcblLey_Wf3LJ_4kSLUUE=")', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    width: '100%',
    marginBottom: '20px'
  };

  return (
    <div>
      <header style={headerStyle}></header> {/* Header with image */}

      <h1 style={{ color: 'black' }}>Products</h1>
      <button onClick={openModal} style={buttonStyle}>Add New Product</button>

      {/* Modal */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button onClick={closeModal} style={closeButtonStyle}>X</button>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Name"
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="type"
                value={newProduct.type}
                onChange={handleChange}
                placeholder="Type"
                required
                style={inputStyle}
              />
              <input
                type="number"
                name="price_per_unit"
                value={newProduct.price_per_unit}
                onChange={handleChange}
                placeholder="Price per Unit"
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="farmer_id"
                value={newProduct.farmer_id}
                onChange={handleChange}
                placeholder="Farmer ID"
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="image_url"
                value={newProduct.image_url}
                onChange={handleChange}
                placeholder="Image URL"
                required
                style={inputStyle}
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Description"
                required
                style={{ ...inputStyle, height: '100px' }}
              />
              <button type="submit" style={buttonStyle}>Add Product</button>
            </form>
          </div>
        </div>
      )}

      <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card" style={cardStyle}>
            <h2 style={{ color: 'green' }}>{product.name}</h2>
            <p>Type: {product.type}</p>
            <p>Price per Unit: ${product.price_per_unit}</p>
            <p>Farmer ID: {product.farmer_id}</p>
            <p>Description: {product.description}</p>
            <img src={product.image_url} alt={product.name} style={imgStyle} />
          </div>
        ))}
      </div>

      <ToastContainer /> {/* Container for toast notifications */}
    </div>
  );
};

export default Products;
