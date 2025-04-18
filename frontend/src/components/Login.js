import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import Logo from '../assets/Logo.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Clear fields when component loads
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed!');
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.role) {
        console.log(`Login Success! Redirecting to ${data.role} dashboard...`);
        localStorage.setItem('jwtToken', data.token);
        
        setSuccess(true);
        setError('');

        setTimeout(() => {
          navigate(data.role === 'USER' ? '/HomePage' : '/dashboard/admin');
        }, 1500);
      } else {
        throw new Error('Role is missing from response');
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
      console.error(err.message);
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
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="new-email" 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password" 
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login Successful! Redirecting...</p>}
      </form>
    </div>
  );
};

export default Login;
