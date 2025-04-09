// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch(() => {});
      localStorage.removeItem('token');
    }
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  // 👉 Navigate to Register page
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="submit">Log In</button>
      </form>

      {/* 🔽 Register Button */}
      <p style={{ marginTop: '10px' }}>
      &nbsp; &nbsp; &nbsp; Don't have an account? &nbsp; &nbsp; 
        <button onClick={goToRegister} className="submit" style={{ width: '180px' }}>
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
