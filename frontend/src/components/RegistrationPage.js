import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';
import Logo from '../assets/Logo.png';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear fields when component loads
  useEffect(() => {
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed!');
        return;
      }

      setSuccess('Registration successful! You can now log in.');
      // Reset form fields after success
      setFormData({firstName: '', lastName: '', email: '', password: ''});
    } catch (e) {
      console.error(e);
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="registration-container">  
      <div className="registration-form">
        <img src={Logo} alt="Logo" className="fli-logo" />
        <h2 className="welcome-message" >Welcome to Fli Super</h2>
        <h2 className="registration-title">User Registration</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="new-firstname"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="new-lastname"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="new-email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          {/* Admin Registration */}
          <p className="admin-registration">
            Register as an Admin <Link to="/admin/register">Register Here</Link>
          </p>

          {/* Link to login page if user already has an account */}
          <p className="redirect-login">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
