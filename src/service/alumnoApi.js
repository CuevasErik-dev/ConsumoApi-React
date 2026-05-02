import axios from './axios';

export const getAlumnos = async () => {
  const { data } = await axios.get("/alumnos/traer-alumnos");
  return data;
};

export const createAlumno = async (alumno) => {
  const { data } = await axios.post("/alumnos/insertar-alumnos", alumno);
  return data;
};

export const updateAlumno = async (id, alumno) => {
  const { data } = await axios.put(`/alumnos/editar-alumnos/${id}`, alumno);
  return data;
};

export const deleteAlumno = async (id) => {
  await axios.delete(`/alumnos/eliminar-alumnos/${id}`);
};