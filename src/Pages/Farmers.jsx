
// src/components/FarmersPage.js
// eslint-disable-next-line no-unused-vars
// src/components/FarmersPage.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FarmersPage.css'; 

const FarmersPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [currentFarmer, setCurrentFarmer] = useState(null);
  const [formMode, setFormMode] = useState('add'); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {

    fetch('http://localhost:3001/farmers')
    fetch('http://localhost:3001/farmers')


      .then(response => response.json())
      .then(data => setFarmers(data))
      .catch(error => console.error('Error fetching farmers:', error));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/farmers${id}`)
        .then(response => response.json())
        .then(data => {
          setCurrentFarmer(data);
          setFormMode('edit');
          setIsModalOpen(true); 
        })
        .catch(error => console.error('Error fetching farmer:', error));
    } else {
      setCurrentFarmer({
        name: '',
        contact: {
          phone: '',
          email: ''
        },
        farm: {
          name: '',
          location: ''
        }
      });
      setFormMode('add');
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFarmer(prevFarmer => ({
      ...prevFarmer,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setCurrentFarmer(prevFarmer => ({
      ...prevFarmer,
      contact: {
        ...prevFarmer.contact,
        [name]: value
      }
    }));
  };

  const handleFarmChange = (e) => {
    const { name, value } = e.target;
    setCurrentFarmer(prevFarmer => ({
      ...prevFarmer,
      farm: {
        ...prevFarmer.farm,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = formMode === 'add' ? 'POST' : 'PUT';
    const url = formMode === 'add'
      ? 'http://localhost:3001/farmers'
      : `http://localhost:3001/farmers${id}`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentFarmer)
    })
      .then(response => response.json())
      .then(() => {
        setIsModalOpen(false); 
        navigate('/farmers');
      })
      .catch(error => console.error(`Error ${formMode === 'add' ? 'adding' : 'updating'} farmer:`, error));
  };

  const handleDelete = (farmerId) => {
    fetch(`http://localhost:3001/farmers${farmerId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setFarmers(farmers.filter(farmer => farmer.id !== farmerId));
      })
      .catch(error => console.error('Error deleting farmer:', error));
  };

  const openModal = () => {
    setCurrentFarmer({
      name: '',
      contact: {
        phone: '',
        email: ''
      },
      farm: {
        name: '',
        location: ''
      }
    });
    setFormMode('add');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="farmers-page">
      <h1>Farmers</h1>
      <button className="open-modal-button" onClick={openModal}>Add New Farmer</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>X</button>
            <form onSubmit={handleSubmit}>
              <h2>{formMode === 'add' ? 'Add New Farmer' : 'Edit Farmer'}</h2>
              <label>
                Name:
                <input type="text" name="name" value={currentFarmer?.name || ''} onChange={handleChange} required />
              </label>
              <br />
              <label>
                Phone:
                <input type="text" name="phone" value={currentFarmer?.contact.phone || ''} onChange={handleContactChange} required />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" value={currentFarmer?.contact.email || ''} onChange={handleContactChange} required />
              </label>
              <br />
              <label>
                Farm Name:
                <input type="text" name="name" value={currentFarmer?.farm.name || ''} onChange={handleFarmChange} required />
              </label>
              <br />
              <label>
                Farm Location:
                <input type="text" name="location" value={currentFarmer?.farm.location || ''} onChange={handleFarmChange} required />
              </label>
              <br />
              <button type="submit">{formMode === 'add' ? 'Add Farmer' : 'Update Farmer'}</button>
            </form>
          </div>
        </div>
      )}

      <h2>Farmer List</h2>
      <ul className="farmer-list">
        {farmers.map(farmer => (
          <li key={farmer.id} className="farmer-item">
            <h3>{farmer.name}</h3>
            <p>Contact: {farmer.contact.phone} | {farmer.contact.email}</p>
            <p>Farm: {farmer.farm.name}, {farmer.farm.location}</p>
            <button className="edit-button" onClick={() => navigate(`/farmers/edit/${farmer.id}`)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(farmer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};




