import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

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
          navigate(data.role === 'USER' ? '/dashboard/user' : '/dashboard/admin');
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
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="new-email" // Prevent autofill
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password" // Prevent autofill
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login Successful! Redirecting...</p>}
      </form>
    </div>
  );
};

export default Login;
