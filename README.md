# React Frontend - Auth & Dashboard App

This is the frontend of a full-stack authentication and dashboard system built using **React**, which connects to a Laravel backend via REST APIs.

---


## 🚀 Features

- ✅ User Login & Registration
- 🔐 Token-based authentication (stored in `localStorage`)
- 🔁 Logout triggered automatically on visiting `/login` route
- 🔒 Protected dashboard route
- 📡 Axios-based HTTP requests
- 🧼 Clean and responsive UI

---

## 📂 Project Structure

src/ ├── api/ # Axios base config & auth functions (login, register) ├── pages/ # Login.jsx, Register.jsx, Dashboard.jsx ├── App.js # App routes ├── index.js # Entry point ├── Auth.css # Styling for forms

yaml
Copy
Edit

---

## 🛠️ Setup & Installation

Follow the steps below to get the React app running locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-frontend-repo.git
cd your-frontend-repo
2. Install the dependencies
npm install
3. Configure the backend API URL
Open src/api/api.js and update the base URL to match your Laravel backend:

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Update this if your backend runs on a different port
});

export default api;
