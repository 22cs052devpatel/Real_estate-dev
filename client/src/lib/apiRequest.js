import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:8800/api" // Local development URL
    : "https://real-estate-dev-1.onrender.com/api", // Production URL
  withCredentials: true,
});

export default apiRequest;