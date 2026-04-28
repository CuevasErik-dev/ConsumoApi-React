import { useState } from 'react';
import { initialMaterias } from '../data/mockData';
import { toast } from 'react-hot-toast';

export const useMaterias = () => {
  const [materias, setMaterias] = useState(initialMaterias);

  const addMateria = (data) => {
    const newId = materias.length > 0 ? Math.max(...materias.map(m => m.id)) + 1 : 1;
    setMaterias([...materias, { ...data, id: newId }]);
    toast.success('Materia guardada');
  };

  const updateMateria = (id, data) => {
    setMaterias(materias.map(m => m.id === id ? { ...data, id } : m));
    toast.success('Materia actualizada');
  };

  const deleteMateria = (id) => {
    if (window.confirm('¿Desea eliminar esta materia?')) {
      setMaterias(materias.filter(m => m.id !== id));
      toast.success('Materia eliminada');
    }
  };

  return {
    materias,
    addMateria,
    updateMateria,
    deleteMateria
  };
};
