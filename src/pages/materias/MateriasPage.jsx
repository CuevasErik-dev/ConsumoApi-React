import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Eye, Pencil, Trash2 } from 'lucide-react';

import Tabla from '../../components/reutilizables/Tabla';
import Boton from '../../components/reutilizables/Boton';
import Modal from '../../components/reutilizables/Modal';

const materiaSchema = z.object({
  nombre: z.string()
    .min(3, 'Nombre muy corto')
    .max(35, 'Máximo 35 caracteres'),
  creditos: z.string()
    .length(1, 'Solo 1 número')
    .regex(/^\d+$/, 'Solo números'),
  semestre: z.string().min(1, 'Seleccione un semestre'),
});

const MateriasPage = () => {
  const [materias, setMaterias] = useState([
    { id: 1, nombre: 'Base de Datos', creditos: '5', semestre: 'Quinto' },
    { id: 2, nombre: 'Programación Orientada a Objetos', creditos: '4', semestre: 'Segundo' },
    { id: 3, nombre: 'Sistemas Operativos', creditos: '4', semestre: 'Sexto' },
    { id: 4, nombre: 'Desarrollo Ágil', creditos: '4', semestre: 'Octavo' },
    { id: 5, nombre: 'Estructura de Datos', creditos: '5', semestre: 'Tercero' },
    { id: 6, nombre: 'Ingeniería de Software', creditos: '4', semestre: 'Séptimo' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(materiaSchema),
    defaultValues: { nombre: '', creditos: '', semestre: '' }
  });

  const soloNumeros = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); };

  const onSubmit = (data) => {
    if (editingId) {
      setMaterias(materias.map(m => m.id === editingId ? { ...data, id: editingId } : m));
      toast.success('Materia actualizada');
      setEditingId(null);
    } else {
      setMaterias([...materias, { ...data, id: Date.now() }]);
      toast.success('Materia guardada');
    }
    reset();
  };

  const handleEdit = (materia) => {
    setEditingId(materia.id);
    setValue('nombre', materia.nombre);
    setValue('creditos', materia.creditos);
    setValue('semestre', materia.semestre);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Desea eliminar esta materia?')) {
      setMaterias(materias.filter(m => m.id !== id));
      toast.success('Materia eliminada');
    }
  };

  const verDetalles = (materia) => {
    setSelectedMateria(materia);
    setIsModalOpen(true);
  };

  const columnas = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre de la Materia' },
    { key: 'creditos', label: 'Creditos' },
    { key: 'semestre', label: 'Semestre' },
  ];

  return (
    <div className="alumnos-layout">
      <div className="page-card">
        <div className="page-header"><h2>Lista de Materias</h2></div>
        <Tabla columnas={columnas} datos={materias} acciones={(materia) => (
          <>
            <button className="icon-btn text-slate-600" onClick={() => verDetalles(materia)}><Eye size={18} /></button>
            <button className="icon-btn text-blue-600" onClick={() => handleEdit(materia)}><Pencil size={18} /></button>
            <button className="icon-btn text-red-600" onClick={() => handleDelete(materia.id)}><Trash2 size={18} /></button>
          </>
        )} />
      </div>

      <div className="page-card">
        <div className="form-header">{editingId ? 'Editar Materia' : 'Agregar Nueva Materia'}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="form-section-title">Detalles de la Materia:</p>
          <div className="form-group">
            <label>Nombre de la Materia:</label>
            <input type="text" maxLength={35} className={`input-base ${errors.nombre ? 'input-error' : ''}`}
              placeholder="ej. Matemáticas Discretas" {...register('nombre')} />
            {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Créditos:</label>
              <input type="text" maxLength={1} className={`input-base ${errors.creditos ? 'input-error' : ''}`}
                placeholder="ej. 5" {...register('creditos')} onInput={soloNumeros} />
              {errors.creditos && <span className="error-message">{errors.creditos.message}</span>}
            </div>
            <div className="form-group">
              <label>Semestre:</label>
              <select className={`input-base ${errors.semestre ? 'input-error' : ''}`} {...register('semestre')}>
                <option value="">Seleccione un semestre</option>
                <option value="Primer">Primer</option>
                <option value="Segundo">Segundo</option>
                <option value="Tercer">Tercer</option>
                <option value="Cuarto">Cuarto</option>
                <option value="Quinto">Quinto</option>
                <option value="Sexto">Sexto</option>
                <option value="Séptimo">Séptimo</option>
                <option value="Octavo">Octavo</option>
                <option value="Noveno">Noveno</option>
              </select>
              {errors.semestre && <span className="error-message">{errors.semestre.message}</span>}
            </div>
          </div>

          <div className="form-actions">
            <Boton variante="secondary" onClick={() => { setEditingId(null); reset(); }}>Cancelar</Boton>
            <Boton type="submit">{editingId ? 'Actualizar' : 'Guardar'}</Boton>
          </div>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Detalles de la Materia">
        {selectedMateria && (
          <div className="alumno-details">
            <div className="detail-row"><span className="detail-label">ID:</span><span className="detail-value">{selectedMateria.id}</span></div>
            <div className="detail-row"><span className="detail-label">Nombre:</span><span className="detail-value">{selectedMateria.nombre}</span></div>
            <div className="detail-row"><span className="detail-label">Créditos:</span><span className="detail-value">{selectedMateria.creditos}</span></div>
            <div className="detail-row"><span className="detail-label">Semestre:</span><span className="detail-value">{selectedMateria.semestre}</span></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MateriasPage;
