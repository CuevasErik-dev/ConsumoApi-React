import axios from './axios';

export const getSemestres = async () => {
  const { data } = await axios.get("/semestres/traer-semestres");
  return data;
};

export const createSemestre = async (semestre) => {
  const { data } = await axios.post("/semestres/insertar-semestre", semestre);
  return data;
};

export const updateSemestre = async (id, semestre) => {
  const { data } = await axios.put(`/semestres/editar-semestre/${id}`, semestre);
  return data;
};

export const deleteSemestre = async (id) => {
  await axios.delete(`/semestres/eliminar-semestre/${id}`);
};
