import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/alumnos`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener todos
export const getAlumnos = async () => {
  const response = await api.get("/traer-alumnos");
  return response.data;
};

// Crear
export const createAlumno = async (alumno) => {
  const response = await api.post("/insertar-alumnos", alumno);
  return response.data;
};

// Actualizar
export const updateAlumno = async (id, alumno) => {
  const response = await api.put(`/editar-alumnos/${id}`, alumno);
  return response.data;
};

// Eliminar
export const deleteAlumno = async (id) => {
  await api.delete(`/eliminar-alumnos/${id}`);
};