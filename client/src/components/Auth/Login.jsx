import React, { useState } from 'react';
import axios from '../../services/api';  
import { useNavigate } from 'react-router-dom';
import './Login.css';


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

      const response = await axios.post('https://mtouchlabs-task-1.onrender.com/auth/login', form);

  
      localStorage.setItem('token', response.data.token);

      navigate('/products');
    } catch (err) {

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



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ toggleForm }) => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:7777/auth/login', form);
//       localStorage.setItem('token', response.data.token);
//       navigate('/products');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Invalid credentials');
//     }
//   };

//   return (
//     <div className="form-container login">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       <p>
//         Don't have an account?{' '}
//         <span onClick={toggleForm} className="toggle-link">
//           Sign Up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;
