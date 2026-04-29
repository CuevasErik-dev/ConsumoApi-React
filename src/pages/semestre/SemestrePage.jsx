import React, { useState } from 'react';
import Modal from '../../components/reutilizables/Modal';
import { useSemestres } from '../../hooks/useSemestres';
import SemestreList from './SemestreList';
import SemestreForm from './SemestreForm';

const SemestrePage = () => {
  const { semestres, addSemestre, updateSemestre, deleteSemestre } = useSemestres();

  const [editingSemestre, setEditingSemestre] = useState(null);
  const [selectedSemestre, setSelectedSemestre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data) => {
    if (editingSemestre) {
      updateSemestre(editingSemestre.id, data);
      setEditingSemestre(null);
    } else {
      addSemestre(data);
    }
  };

  const handleEdit = (semestre) => setEditingSemestre(semestre);

  const handleCancel = () => setEditingSemestre(null);

  const handleDelete = (id) => deleteSemestre(id);

  const handleView = (semestre) => {
    setSelectedSemestre(semestre);
    setIsModalOpen(true);
  };

  return (
    <div className="alumnos-layout">
      <SemestreList semestres={semestres} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
      <SemestreForm onSave={handleSave} editingSemestre={editingSemestre} onCancel={handleCancel} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Detalles del Semestre">
        {selectedSemestre && (
          <div className="alumno-details">
            <div className="detail-row"><span className="detail-label">ID:</span><span className="detail-value">{selectedSemestre.id}</span></div>
            <div className="detail-row"><span className="detail-label">Nombre:</span><span className="detail-value">{selectedSemestre.nombre}</span></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SemestrePage;
