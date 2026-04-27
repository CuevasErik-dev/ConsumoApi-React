import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Eye, Pencil, Trash2, Upload, User } from 'lucide-react';

import Tabla from '../../components/reutilizables/Tabla';
import Boton from '../../components/reutilizables/Boton';
import Modal from '../../components/reutilizables/Modal';

const alumnoSchema = z.object({
  imagen: z.string().url('Debe ser una URL válida').or(z.literal('')),
  nombre: z.string()
    .min(1, 'Requerido')
    .max(10, 'Máximo 10 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
  apellido: z.string()
    .min(1, 'Requerido')
    .max(20, 'Máximo 20 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
  email: z.string().email('Correo inválido'),
  telefono: z.string()
    .length(10, 'Deben ser 10 números')
    .regex(/^\d+$/, 'Solo números'),
  numControl: z.string()
    .length(8, 'Deben ser 8 números')
    .regex(/^\d+$/, 'Solo números'),
});

const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([
    {
      id: 1,
      imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      numControl: '22620050',
      nombre: 'Ameli',
      apellido: 'Reyes',
      email: 'amelireyes@gmail.com',
      telefono: '9531236651'
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(alumnoSchema),
    defaultValues: { imagen: '', nombre: '', apellido: '', email: '', telefono: '', numControl: '' }
  });

  const imagenUrl = watch('imagen');

  const soloNumeros = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); };
  const soloLetras = (e) => { e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); };

  const onSubmit = (data) => {
    if (editingId) {
      setAlumnos(alumnos.map(al => al.id === editingId ? { ...data, id: editingId } : al));
      toast.success('Alumno actualizado');
      setEditingId(null);
    } else {
      setAlumnos([...alumnos, { ...data, id: Date.now() }]);
      toast.success('Alumno registrado');
    }
    reset();
  };

  const handleEdit = (alumno) => {
    setEditingId(alumno.id);
    Object.keys(alumno).forEach(key => { if (key !== 'id') setValue(key, alumno[key]); });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      setAlumnos(alumnos.filter(al => al.id !== id));
      toast.success('Alumno eliminado');
    }
  };

  const verDetalles = (alumno) => {
    setSelectedAlumno(alumno);
    setIsModalOpen(true);
  };

  const columnas = [
    {
      key: 'imagen', label: 'Imagen', render: (val) => (
        <div className="table-avatar">{val ? <img src={val} alt="Perfil" /> : <User size={18} />}</div>
      )
    },
    { key: 'numControl', label: 'NumControl' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'email', label: 'Correo Electronico' },
    { key: 'telefono', label: 'Telefono' },
  ];

  return (
    <div className="alumnos-layout">
      <div className="page-card">
        <div className="page-header"><h2>Lista de Alumnos</h2></div>
        <Tabla columnas={columnas} datos={alumnos} acciones={(alumno) => (
          <>
            <button className="icon-btn text-slate-600" onClick={() => verDetalles(alumno)}><Eye size={18} /></button>
            <button className="icon-btn text-blue-600" onClick={() => handleEdit(alumno)}><Pencil size={18} /></button>
            <button className="icon-btn text-red-600" onClick={() => handleDelete(alumno.id)}><Trash2 size={18} /></button>
          </>
        )} />
      </div>

      <div className="page-card">
        <div className="form-header">{editingId ? 'Editar Alumno' : 'Agregar Nuevo Alumno'}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Imagen de Perfil:</label>
            <div className="avatar-preview-container">
              <div className="avatar-circle">{imagenUrl ? <img src={imagenUrl} alt="Preview" /> : <Upload size={32} />}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Enlace (URL) de la imagen:</p>
                <input type="text" className={`input-base ${errors.imagen ? 'input-error' : ''}`} placeholder="https://ejemplo.com/foto.jpg" {...register('imagen')} />
                {errors.imagen && <span className="error-message">{errors.imagen.message}</span>}
              </div>
            </div>
          </div>

          <p className="form-section-title">Informacion Personal:</p>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" maxLength={10} className={`input-base ${errors.nombre ? 'input-error' : ''}`} placeholder="ej. Juan" {...register('nombre')} onInput={soloLetras} />
              {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
            </div>
            <div className="form-group">
              <label>Apellido:</label>
              <input type="text" maxLength={20} className={`input-base ${errors.apellido ? 'input-error' : ''}`} placeholder="ej. Pérez" {...register('apellido')} onInput={soloLetras} />
              {errors.apellido && <span className="error-message">{errors.apellido.message}</span>}
            </div>
          </div>

          <p className="form-section-title">Datos de Contacto:</p>
          <div className="form-row">
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input type="email" className={`input-base ${errors.email ? 'input-error' : ''}`} placeholder="ej. juan@email.com" {...register('email')} />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input type="text" maxLength={10} className={`input-base ${errors.telefono ? 'input-error' : ''}`} placeholder="ej. 2221234567" {...register('telefono')} onInput={soloNumeros} />
              {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
            </div>
          </div>

          <p className="form-section-title">Numero de Control (8 dígitos):</p>
          <div className="form-group">
            <input type="text" maxLength={8} className={`input-base ${errors.numControl ? 'input-error' : ''}`} placeholder="ej. 22620050" {...register('numControl')} onInput={soloNumeros} />
            {errors.numControl && <span className="error-message">{errors.numControl.message}</span>}
          </div>

          <div className="form-actions">
            <Boton variante="secondary" onClick={() => { setEditingId(null); reset(); }}>Cancelar</Boton>
            <Boton type="submit"> {editingId ? 'Actualizar' : 'Guardar'} </Boton>
          </div>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Detalles del Alumno">
        {selectedAlumno && (
          <div className="alumno-details">
            <div className="detail-row"><span className="detail-label">NumControl:</span><span className="detail-value">{selectedAlumno.numControl}</span></div>
            <div className="detail-row"><span className="detail-label">Nombre:</span><span className="detail-value">{selectedAlumno.nombre}</span></div>
            <div className="detail-row"><span className="detail-label">Apellido:</span><span className="detail-value">{selectedAlumno.apellido}</span></div>
            <div className="detail-row"><span className="detail-label">Correo:</span><span className="detail-value">{selectedAlumno.email}</span></div>
            <div className="detail-row"><span className="detail-label">Teléfono:</span><span className="detail-value">{selectedAlumno.telefono}</span></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AlumnosPage;
