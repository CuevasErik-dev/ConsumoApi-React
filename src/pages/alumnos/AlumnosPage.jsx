import React, { useState } from 'react';
import Modal from '../../components/reutilizables/Modal';
import { useAlumnos } from '../../hooks/useAlumnos';
import AlumnosList from './AlumnosList';
import AlumnoForm from './AlumnoForm';

const AlumnosPage = () => {
  const { alumnos, addAlumno, updateAlumno, deleteAlumno } = useAlumnos();

  const [editingAlumno, setEditingAlumno] = useState(null);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data) => {
    if (editingAlumno) {
      updateAlumno(editingAlumno.id, data);
      setEditingAlumno(null);
    } else {
      addAlumno(data);
    }
  };

  const handleEdit = (alumno) => setEditingAlumno(alumno);

  const handleCancel = () => setEditingAlumno(null);

  const handleDelete = (id) => deleteAlumno(id);

  const handleView = (alumno) => {
    setSelectedAlumno(alumno);
    setIsModalOpen(true);
  };

  return (
    <div className="alumnos-layout">
      <AlumnosList 
        alumnos={alumnos} 
        onDelete={handleDelete} 
        onView={handleView}
        onEdit={handleEdit}
      />

      <AlumnoForm 
        onSave={handleSave} 
        editingAlumno={editingAlumno} 
        onCancel={handleCancel} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        titulo="Detalles del Alumno"
      >
        {selectedAlumno && (
          <div className="alumno-details">

            <div className="detail-row">
              <span className="detail-label">Num. Control:</span>
              <span className="detail-value">{selectedAlumno.numeroControl}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">{selectedAlumno.nombre}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Apellido:</span>
              <span className="detail-value">{selectedAlumno.apellido}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Correo:</span>
              <span className="detail-value">{selectedAlumno.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Teléfono:</span>
              <span className="detail-value">{selectedAlumno.telefono}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Carrera:</span>
              <span className="detail-value">{selectedAlumno.carrera}</span>
            </div>

          </div>
        )}
      </Modal>
    </div>
   );
}

export default AlumnosPage;