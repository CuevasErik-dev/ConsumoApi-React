import axios from "axios";

// 👉 URL base de tu backend
const API_BASE_URL = "http://localhost:8080";

// 👉 instancia global de axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 (opcional pero recomendado) interceptor para errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);