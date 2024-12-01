

import React, { useState } from 'react';
import axios from '../../services/api';  // Adjust the import based on your axios setup
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:7777/auth/login', form);

      // Store the token in localStorage after successful login
      localStorage.setItem('token', response.data.token);

      // Navigate to the 'products' page after login
      navigate('/products');
    } catch (err) {
      // Display error message if login fails
      setError(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  return (
    <div style={{ width: '300px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <div style={{ marginTop: '20px' }}>
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate('/signup')}
          style={{
            padding: '10px 20px',
            marginTop: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
