import React, { useState, useEffect } from 'react';
import './Login.css'; 
import Logo from '../assets/Logo.png';
import {Link, useNavigate} from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clear fields when component loads
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed!');
        return; // Stop further execution
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.role) {
        console.log(`Login Success! Redirecting to ${data.role} dashboard...`);
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userEmail', email);
        setSuccess(true);
        setError('');

        setTimeout(() => {
          if (data.role === 'ADMIN') {
            navigate('/admin/Dashboard');
          } else if (data.role === 'USER') {
            navigate('/home');
          } else {
            navigate('/login');
          }
        }, 1500);
      } else {
        setError('Role is missing from response');
      }
    } catch (e) {
      console.error(e);
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
      <img src={Logo} alt="Logo" className="logo" />
      <h2 className="login-title" >Welcome back to Fli Super</h2>
      <h3 className="login-subtitle">Login to your account</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login Successful! Redirecting...</p>}
        {/* Link to registration page if user want to create an account */}
        <p className="redirect-register">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
