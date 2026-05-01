import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Tabla from '../../components/reutilizables/Tabla';

const MateriasList = ({ materias, onEdit, onDelete, onView }) => {
  const columnas = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre de la Materia' },
    { key: 'creditos', label: 'Creditos' },

    // 🔥 CORRECCIÓN AQUÍ
    {
      key: 'semestre',
      label: 'Semestre',
      render: (val) => val?.id
    },
  ];

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Lista de Materias</h2>
      </div>

      <Tabla
        columnas={columnas}
        datos={materias}
        acciones={(materia) => (
          <>
            <button className="icon-btn text-slate-600" onClick={() => onView(materia)}>
              <Eye size={18} />
            </button>
            <button className="icon-btn text-blue-600" onClick={() => onEdit(materia)}>
              <Pencil size={18} />
            </button>
            <button className="icon-btn text-red-600" onClick={() => onDelete(materia.id)}>
              <Trash2 size={18} />
            </button>
          </>
        )}
      />
    </div>
  );
};

export default MateriasList;