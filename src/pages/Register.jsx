// src/pages/Register.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      alert('Error registering user');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit" className="submit">Sign Up</button>
      </form>

      {/* 🔽 Login Redirect Button */}
      <p style={{ marginTop: '10px' }}>
      &nbsp; &nbsp; Already have an account? &nbsp;
        <button onClick={goToLogin} className="submit" style={{ width: '180px' }}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
