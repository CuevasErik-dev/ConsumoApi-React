// src/service/materiaApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/materias";

export const getMaterias = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMateria = async (materia) => {
  const res = await axios.post(`${API_URL}/insertar-materia`, materia);
  return res.data;
};

export const updateMateria = async (id, materia) => {
  const res = await axios.put(`${API_URL}/editar-materia/${id}`, materia);
  return res.data;
};

export const deleteMateria = async (id) => {
  await axios.delete(`${API_URL}/eliminar-materia/${id}`);
};