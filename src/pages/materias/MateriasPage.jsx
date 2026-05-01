import React, { useState } from 'react';
import Modal from '../../components/reutilizables/Modal';
import { useMaterias } from '../../hooks/useMaterias';
import MateriasList from './MateriasList';
import MateriaForm from './MateriaForm';

const MateriasPage = () => {
  const { materias, addMateria, updateMateria, deleteMateria } = useMaterias();

  const [editingMateria, setEditingMateria] = useState(null);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 CORRECCIÓN CLAVE AQUÍ
  const handleSave = (data) => {

    const materiaFormateada = {
      ...data,
      creditos: Number(data.creditos), // asegura número
      semestre: {
        id: Number(data.semestre) // 👈 AQUÍ SE ARREGLA EL ERROR DEL BACKEND
      }
    };

    if (editingMateria) {
      updateMateria(editingMateria.id, materiaFormateada);
      setEditingMateria(null);
    } else {
      addMateria(materiaFormateada);
    }
  };

  const handleEdit = (materia) => {
    setEditingMateria({
      ...materia,
      semestre: materia.semestre?.id // 👈 para que el form lo muestre bien
    });
  };

  const handleCancel = () => setEditingMateria(null);

  const handleDelete = (id) => deleteMateria(id);

  const handleView = (materia) => {
    setSelectedMateria(materia);
    setIsModalOpen(true);
  };

  return (
    <div className="alumnos-layout">

      {/* 🔹 LISTA */}
      <MateriasList
        materias={materias}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* 🔹 FORMULARIO */}
      <MateriaForm
        onSave={handleSave}
        editingMateria={editingMateria}
        onCancel={handleCancel}
      />

      {/* 🔹 MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        titulo="Detalles de la Materia"
      >
        {selectedMateria && (
          <div className="alumno-details">

            <div className="detail-row">
              <span className="detail-label">ID:</span>
              <span className="detail-value">
                {selectedMateria.id}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">
                {selectedMateria.nombre}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Créditos:</span>
              <span className="detail-value">
                {selectedMateria.creditos}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Semestre:</span>
              <span className="detail-value">
                {selectedMateria.semestre?.id}
              </span>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default MateriasPage;