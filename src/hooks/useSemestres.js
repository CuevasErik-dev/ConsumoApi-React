import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
  getSemestres as apiGetSemestres,
  createSemestre,
  updateSemestre as apiUpdateSemestre,
  deleteSemestre as apiDeleteSemestre
} from '../service/semestreApi';

export const useSemestres = () => {
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    cargarSemestres();
  }, []);

  const cargarSemestres = async () => {
    try {
      const data = await apiGetSemestres();
      setSemestres(data);
    } catch (error) {
      console.error("Error al cargar semestres:", error);
      toast.error("Error al conectar con el backend (semestres)");
    }
  };

  const addSemestre = async (data) => {
    try {
      await createSemestre(data);
      toast.success('Semestre guardado');
      cargarSemestres();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar el semestre");
    }
  };

  const updateSemestre = async (id, data) => {
    try {
      await apiUpdateSemestre(id, data);
      toast.success('Semestre actualizado');
      cargarSemestres();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el semestre");
    }
  };

  const deleteSemestre = async (id) => {
    const result = await Swal.fire({
      title: '¿Desea eliminar este semestre?',
      text: "¡No podrás recuperar el semestre!",
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
        await apiDeleteSemestre(id);
        toast.success('Semestre eliminado');
        cargarSemestres();
      } catch (error) {
        console.error(error);
        toast.error("No se pudo eliminar el semestre");
      }
    }
  };

  return {
    semestres,
    addSemestre,
    updateSemestre,
    deleteSemestre
  };
};
