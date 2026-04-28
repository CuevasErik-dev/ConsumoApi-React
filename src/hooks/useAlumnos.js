import { useState } from 'react';
import { initialAlumnos } from '../data/mockData';
import { toast } from 'react-hot-toast';

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState(initialAlumnos);

  const addAlumno = (data) => {
    const newId = alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) + 1 : 1;
    setAlumnos([...alumnos, { ...data, id: newId }]);
    toast.success('Alumno registrado');
  };

  const updateAlumno = (id, data) => {
    setAlumnos(alumnos.map(al => al.id === id ? { ...data, id } : al));
    toast.success('Alumno actualizado');
  };

  const deleteAlumno = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      setAlumnos(alumnos.filter(al => al.id !== id));
      toast.success('Alumno eliminado');
    }
  };

  return {
    alumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno
  };
};
