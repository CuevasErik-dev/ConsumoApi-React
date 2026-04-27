import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Eye, Pencil, Trash2 } from 'lucide-react';

import Tabla from '../../components/reutilizables/Tabla';
import Boton from '../../components/reutilizables/Boton';
import Modal from '../../components/reutilizables/Modal';

const semestreSchema = z.object({
  nombre: z.string()
    .min(3, 'Nombre muy corto')
    .max(25, 'Máximo 15 caracteres'),
});

const SemestrePage = () => {
  const [semestres, setSemestres] = useState([
    { id: 1, nombre: '1er Sem 2024' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [selectedSemestre, setSelectedSemestre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(semestreSchema),
    defaultValues: { nombre: '' }
  });

  const onSubmit = (data) => {
    if (editingId) {
      setSemestres(semestres.map(s => s.id === editingId ? { ...data, id: editingId } : s));
      toast.success('Semestre actualizado');
      setEditingId(null);
    } else {
      const newId = semestres.length > 0 ? Math.max(...semestres.map(s => s.id)) + 1 : 1;
      setSemestres([...semestres, { ...data, id: newId }]);
      toast.success('Semestre guardado');
    }
    reset();
  };

  const handleEdit = (semestre) => {
    setEditingId(semestre.id);
    setValue('nombre', semestre.nombre);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Desea eliminar este semestre?')) {
      setSemestres(semestres.filter(s => s.id !== id));
      toast.success('Semestre eliminado');
    }
  };

  const verDetalles = (semestre) => {
    setSelectedSemestre(semestre);
    setIsModalOpen(true);
  };

  const columnas = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre del Semestre' },
  ];

  return (
    <div className="alumnos-layout">
      <div className="page-card">
        <div className="page-header"><h2>Lista de Semestres</h2></div>
        <Tabla columnas={columnas} datos={semestres} acciones={(semestre) => (
          <>
            <button className="icon-btn text-slate-600" onClick={() => verDetalles(semestre)}><Eye size={18} /></button>
            <button className="icon-btn text-blue-600" onClick={() => handleEdit(semestre)}><Pencil size={18} /></button>
            <button className="icon-btn text-red-600" onClick={() => handleDelete(semestre.id)}><Trash2 size={18} /></button>
          </>
        )} />
      </div>

      <div className="page-card">
        <div className="form-header">{editingId ? 'Editar Semestre' : 'Agregar Nuevo Semestre'}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="form-section-title">Detalles del Semestre:</p>
          <div className="form-group">
            <label>Nombre del Semestre:</label>
            <input type="text" maxLength={25} className={`input-base ${errors.nombre ? 'input-error' : ''}`}
              placeholder="ej. Primer Semestre" {...register('nombre')} />
            {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
          </div>

          <div className="form-actions">
            <Boton variante="secondary" onClick={() => { setEditingId(null); reset(); }}>Cancelar</Boton>
            <Boton type="submit">{editingId ? 'Actualizar Semestre' : 'Guardar Semestre'}</Boton>
          </div>
        </form>
      </div>

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
