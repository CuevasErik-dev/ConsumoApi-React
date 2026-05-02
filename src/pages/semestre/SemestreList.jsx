import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Tabla from '../../components/reutilizables/Tabla';

const SemestreList = ({ semestres, onEdit, onDelete, onView }) => {
  const columnas = [
    { key: 'id', label: 'ID', render: (_, __, index) => index + 1 },
    { key: 'nombre', label: 'Nombre del Semestre' },
  ];

  return (
    <div className="page-card">
      <div className="page-header"><h2>Lista de Semestres</h2></div>
      <Tabla columnas={columnas} datos={semestres} acciones={(semestre) => (
        <>
          <button className="icon-btn text-slate-600" onClick={() => onView(semestre)}><Eye size={18} /></button>
          <button className="icon-btn text-blue-600" onClick={() => onEdit(semestre)}><Pencil size={18} /></button>
          <button className="icon-btn text-red-600" onClick={() => onDelete(semestre.id)}><Trash2 size={18} /></button>
        </>
      )} />
    </div>
  );
};

export default SemestreList;
