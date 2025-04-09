// src/api/auth.js
import axios from 'axios';

const token = localStorage.getItem('token');

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend URL
  withCredentials: true, // needed for cookies (optional)
});

// Register User
export const registerUser = async (userData) => {
  const res = await API.post('/register', userData);
  return res.data;
};

// Login User
export const loginUser = async (userData) => {
  const res = await API.post('/login', userData);
  
  return res.data;
};

// Login User

export const fetchTasks = async () => {
  try {
    const res = await API.get('/tasks',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return res.data;
  } catch (err) {
   return err;
  }
};
