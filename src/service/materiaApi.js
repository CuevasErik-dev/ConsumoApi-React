import axios from './axios';

export const getMaterias = async () => {
  const { data } = await axios.get("/materias/materias");
  return data;
};

export const createMateria = async (materia) => {
  const { data } = await axios.post("/materias/insertar-materia", materia);
  return data;
};

export const updateMateria = async (id, materia) => {
  const { data } = await axios.put(`/materias/editar-materia/${id}`, materia);
  return data;
};

export const deleteMateria = async (id) => {
  await axios.delete(`/materias/eliminar-materia/${id}`);
};