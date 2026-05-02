import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { getAlumnos as apiGetAlumnos, createAlumno, updateAlumno as apiUpdateAlumno, deleteAlumno as apiDeleteAlumno } from '../service/alumnoApi';

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = async () => {
    try {
      const data = await apiGetAlumnos();
      setAlumnos(data);
    } catch (error) {
      console.error("Error real:", error);
      toast.error("Error al conectar con el backend");
    }
  };
  const addAlumno = async (data) => {
    try {
      await createAlumno(data);
      toast.success('Alumno registrado');
      cargarAlumnos();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar");
    }
  };

  const updateAlumno = async (id, data) => {
    try {
      await apiUpdateAlumno(id, data);
      toast.success('Alumno actualizado');
      cargarAlumnos();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar");
    }
  };

  const deleteAlumno = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperar este alumno!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1e293b',
      color: '#f8fafc'
    });

    if (result.isConfirmed) {
      try {
        await apiDeleteAlumno(id);
        toast.success('Alumno eliminado');
        cargarAlumnos();
      } catch (error) {
        console.error(error);
        toast.error("No se pudo eliminar");
      }
    }
  };

  return {
    alumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno
  };
};
