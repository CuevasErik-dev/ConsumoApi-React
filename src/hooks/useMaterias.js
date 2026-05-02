import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { getMaterias as apiGetMaterias, createMateria, updateMateria as apiUpdateMateria, deleteMateria as apiDeleteMateria } from '../service/materiaApi';

export const useMaterias = () => {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    try {
      const data = await apiGetMaterias();
      setMaterias(data);
    } catch (error) {
      console.error("Error al cargar materias:", error);
      toast.error("Error al conectar con el backend (materias)");
    }
  };

  const addMateria = async (data) => {
    try {
      await createMateria(data);
      toast.success('Materia guardada');
      cargarMaterias();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar la materia");
    }
  };

  const updateMateria = async (id, data) => {
    try {
      await apiUpdateMateria(id, data);
      toast.success('Materia actualizada');
      cargarMaterias();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar la materia");
    }
  };

  const deleteMateria = async (id) => {
    const result = await Swal.fire({
      title: '¿Desea eliminar esta materia?',
      text: "¡No podrás recuperar la materia!",
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
        await apiDeleteMateria(id);
        toast.success('Materia eliminada');
        cargarMaterias();
      } catch (error) {
        console.error(error);
        toast.error("No se pudo eliminar la materia");
      }
    }
  };

  return {
    materias,
    addMateria,
    updateMateria,
    deleteMateria
  };
};
