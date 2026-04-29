import { useState } from 'react';
import { initialSemestres } from '../data/mockData';
import { toast } from 'react-hot-toast';

export const useSemestres = () => {
  const [semestres, setSemestres] = useState(initialSemestres);

  const addSemestre = (data) => {
    const newId = semestres.length > 0 ? Math.max(...semestres.map(s => s.id)) + 1 : 1;
    setSemestres([...semestres, { ...data, id: newId }]);
    toast.success('Semestre guardado');
  };

  const updateSemestre = (id, data) => {
    setSemestres(semestres.map(s => s.id === id ? { ...data, id } : s));
    toast.success('Semestre actualizado');
  };

  const deleteSemestre = (id) => {
    if (window.confirm('¿Desea eliminar este semestre?')) {
      setSemestres(semestres.filter(s => s.id !== id));
      toast.success('Semestre eliminado');
    }
  };

  return {
    semestres,
    addSemestre,
    updateSemestre,
    deleteSemestre
  };
};
