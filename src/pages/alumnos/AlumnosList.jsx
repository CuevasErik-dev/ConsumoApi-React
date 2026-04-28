import React from 'react';
import { Eye, Pencil, Trash2, User } from 'lucide-react';
import Tabla from '../../components/reutilizables/Tabla';

const AlumnosList = ({ alumnos, onEdit, onDelete, onView }) => {
  const columnas = [
    {
      key: 'imagenURL', label: 'Imagen', render: (val) => (
        <div className="table-avatar">{val ? <img src={val} alt="Perfil" /> : <User size={18} />}</div>
      )
    },
    { key: 'numeroControl', label: 'NumControl' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'email', label: 'Correo Electronico' },
    { key: 'telefono', label: 'Telefono' },
    { key: 'carrera', label: 'Carrera', className: 'allow-wrap' },
  ];

  return (
    <div className="page-card">
      <div className="page-header"><h2>Lista de Alumnos</h2></div>
      <Tabla columnas={columnas} datos={alumnos} acciones={(alumno) => (
        <>
          <button className="icon-btn text-slate-600" onClick={() => onView(alumno)}><Eye size={18} /></button>
          <button className="icon-btn text-blue-600" onClick={() => onEdit(alumno)}><Pencil size={18} /></button>
          <button className="icon-btn text-red-600" onClick={() => onDelete(alumno.id)}><Trash2 size={18} /></button>
        </>
      )} />
    </div>
  );
};

export default AlumnosList;
