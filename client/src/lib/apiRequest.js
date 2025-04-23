import axios from "axios";

const apiRequest = axios.create({
  // baseURL: "http://localhost:8800/api",
  baseURL: "https://real-estate-dev-1.onrender.com", // Replace with your Render backend URL
  withCredentials: true,
});

export default apiRequest;