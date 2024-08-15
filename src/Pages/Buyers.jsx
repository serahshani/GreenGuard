import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BuyersPage = () => {
  const [buyers, setBuyers] = useState([]);
  const [filteredBuyers, setFilteredBuyers] = useState([]);
  const [currentBuyer, setCurrentBuyer] = useState({
    name: '',
    contact: {
      phone: '',
      email: ''
    },
    lookingFor: ''
  });
  const [formMode, setFormMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [buyerToDelete, setBuyerToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchApplied, setSearchApplied] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/buyers')
      .then(response => response.json())
      .then(data => {
        setBuyers(data);
        setFilteredBuyers(data); // Initialize filteredBuyers with all buyers
      })
      .catch(error => console.error('Error fetching buyers:', error));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/buyers/${id}`)
        .then(response => response.json())
        .then(data => {
          setCurrentBuyer(data);
          setFormMode('edit');
          setIsModalOpen(true);
        })
        .catch(error => console.error('Error fetching buyer:', error));
    } else {
      setCurrentBuyer({
        name: '',
        contact: {
          phone: '',
          email: ''
        },
        lookingFor: ''
      });
      setFormMode('add');
    }
  }, [id]);

  useEffect(() => {
    if (searchApplied) {
      // Local search implementation
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = buyers.filter(buyer =>
        buyer.name.toLowerCase().includes(lowercasedQuery) ||
        buyer.lookingFor.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredBuyers(results);
    } else {
      setFilteredBuyers(buyers); // Show all buyers if no search query is applied
    }
  }, [searchApplied, searchQuery, buyers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBuyer(prevBuyer => ({
      ...prevBuyer,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setCurrentBuyer(prevBuyer => ({
      ...prevBuyer,
      contact: {
        ...prevBuyer.contact,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formMode === 'add' ? 'POST' : 'PUT';
    const url = formMode === 'add'
      ? 'http://localhost:3001/buyers'
      : `http://localhost:3001/buyers/${currentBuyer.id}`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentBuyer)
    })
      .then(response => response.json())
      .then(() => {
        setIsModalOpen(false);
        setDropdownOpen(null);
        return fetch('http://localhost:3001/buyers');
      })
      .then(response => response.json())
      .then(data => {
        setBuyers(data);
        if (!searchApplied) {
          setFilteredBuyers(data); // Update filtered list if no search query is applied
        }
      })
      .catch(error => console.error(`Error ${formMode === 'add' ? 'adding' : 'updating'} buyer:`, error));
  };

  const handleDelete = () => {
    if (buyerToDelete) {
      fetch(`http://localhost:3001/buyers/${buyerToDelete}`, {
        method: 'DELETE'
      })
        .then(() => {
          setBuyers(buyers.filter(buyer => buyer.id !== buyerToDelete));
          setIsDeleteModalOpen(false);
          setDropdownOpen(null);
        })
        .catch(error => console.error('Error deleting buyer:', error));
    }
  };

  const openModalForAdding = () => {
    setCurrentBuyer({
      name: '',
      contact: {
        phone: '',
        email: ''
      },
      lookingFor: ''
    });
    setFormMode('add');
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const openModalForEditing = (buyer) => {
    setCurrentBuyer(buyer);
    setFormMode('edit');
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const openDeleteModal = (buyerId) => {
    setBuyerToDelete(buyerId);
    setIsDeleteModalOpen(true);
    setDropdownOpen(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(prevId => (prevId === id ? null : id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const applySearch = () => {
    setSearchApplied(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchApplied(false);
    setFilteredBuyers(buyers); // Reset to all buyers
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Buyers</h1>
      <button
        onClick={openModalForAdding}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginRight: '10px'
        }}
      >
        Add New Buyer
      </button>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name or what they're looking for..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1em',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '300px' // Responsive max width
          }}
        />
        <button
          onClick={applySearch}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            marginLeft: '10px'
          }}
        >
          Search
        </button>
        <button
          onClick={clearSearch}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            marginLeft: '10px'
          }}
        >
          Clear
        </button>
      </div>

      <h2 style={{ fontSize: '1.5em', margin: '20px 0', color: '#555' }}>Buyer List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredBuyers.map(buyer => (
          <div key={buyer.id} style={{ 
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '15px',
            width: '300px',
            position: 'relative',
            background: 'linear-gradient(145deg, #f0f4f8, #ffffff)',
            transition: 'box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)'}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '1.25em', color: '#333', borderBottom: '2px solid #28a745', paddingBottom: '5px' }}>{buyer.name}</h3>
            <p style={{ margin: '0 0 10px', color: '#666' }}>Phone: {buyer.contact.phone}</p>
            <p style={{ margin: '0', color: '#666' }}>Email: {buyer.contact.email}</p>
            <p style={{ margin: '0', color: '#666' }}>Looking For: {buyer.lookingFor || 'N/A'}</p>
            <div style={{ position: 'relative', marginTop: '10px' }}>
              <button
                onClick={() => toggleDropdown(buyer.id)}
                style={{
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px',
                  fontSize: '1em',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ marginRight: '5px' }}>Options</span>
                <span style={{ fontSize: '1.2em', color: '#333' }}>&#9660;</span>
              </button>
              {dropdownOpen === buyer.id && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  zIndex: 1,
                  top: '100%',
                  right: 0,
                  width: '100%'
                }}>
                  <button
                    onClick={() => openModalForEditing(buyer)}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1em',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(buyer.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1em',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            width: '500px'
          }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '1.5em', color: '#333' }}>
              {formMode === 'add' ? 'Add Buyer' : 'Edit Buyer'}
            </h2>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentBuyer.name}
                  onChange={handleChange}
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={currentBuyer.contact.phone}
                  onChange={handleContactChange}
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={currentBuyer.contact.email}
                  onChange={handleContactChange}
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Looking For:
                <input
                  type="text"
                  name="lookingFor"
                  value={currentBuyer.lookingFor}
                  onChange={handleChange}
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
              <button
                type="submit"
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  marginRight: '10px'
                }}
              >
                {formMode === 'add' ? 'Add Buyer' : 'Update Buyer'}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1em'
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            width: '300px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '1.5em', color: '#333' }}>Confirm Delete</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>Are you sure you want to delete this buyer?</p>
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                marginRight: '10px'
              }}
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyersPage;
