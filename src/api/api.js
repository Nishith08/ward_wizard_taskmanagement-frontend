import axios from "axios";
//import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // adjust as needed
});

// ✅ Axios Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Unauthenticated."
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // force redirect
    }
    return Promise.reject(error);
  }
);

export default api;
