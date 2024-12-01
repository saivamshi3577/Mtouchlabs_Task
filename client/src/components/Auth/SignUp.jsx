import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mtouchlabs-task-1.onrender.com/signup', form, {
        // const response = await axios.post('http://localhost:7777/signup', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token, msg } = response.data;
      localStorage.setItem('token', token);
      alert(msg);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="switch-container">
          <p>Already have an account?</p>
          <button onClick={() => navigate('/login')} className="switch-btn">
            Login
          </button>
        </div>
      </div>
      <div className="signup-image"></div>
    </div>
  );
};

export default SignUp;