import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { alumnoSchema } from '../../utils/validations';
import { soloNumeros, soloLetras } from '../../utils/helpers';
import Boton from '../../components/reutilizables/Boton';

const AlumnoForm = ({ onSave, editingAlumno, onCancel }) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(alumnoSchema),
    defaultValues: { imagenURL: '', nombre: '', apellido: '', email: '', telefono: '', numeroControl: '', carrera: '' }
  });

  const imagenUrl = watch('imagenURL');

  useEffect(() => {
    if (editingAlumno) {
      Object.keys(editingAlumno).forEach(key => {
        if (key !== 'id') setValue(key, editingAlumno[key]);
      });
    } else {
      reset();
    }
  }, [editingAlumno, setValue, reset]);

  const submitForm = (data) => {
    onSave(data);
    reset();
  };

  return (
    <div className="page-card">
      <div className="form-header">{editingAlumno ? 'Editar Alumno' : 'Agregar Nuevo Alumno'}</div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <label>Imagen de Perfil:</label>
          <div className="avatar-preview-container">
            <div className="avatar-circle">{imagenUrl ? <img src={imagenUrl} alt="Preview" /> : <Upload size={32} />}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Enlace (URL) de la imagen:</p>
              <input type="text" className={`input-base ${errors.imagenURL ? 'input-error' : ''}`} placeholder="https://ejemplo.com/foto.jpg" {...register('imagenURL')} />
              {errors.imagenURL && <span className="error-message">{errors.imagenURL.message}</span>}
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
            <input type="text" maxLength={10} className={`input-base ${errors.telefono ? 'input-error' : ''}`} placeholder="ej. 9531236651" {...register('telefono')} onInput={soloNumeros} />
            {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
          </div>
        </div>

        <p className="form-section-title">Numero de Control (8-10 dígitos):</p>
        <div className="form-group">
          <input type="text" maxLength={10} className={`input-base ${errors.numeroControl ? 'input-error' : ''}`} placeholder="ej. 22620050" {...register('numeroControl')} onInput={soloNumeros} />
          {errors.numeroControl && <span className="error-message">{errors.numeroControl.message}</span>}
        </div>

        <p className="form-section-title">Carrera:</p>
        <div className="form-group">
          <select className={`input-base ${errors.carrera ? 'input-error' : ''}`} {...register('carrera')}>
            <option value="">Selecciona una carrera</option>
            <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
            <option value="Ingeniería Civil">Ingeniería Civil</option>
            <option value="Ingeniería en Gestión Empresarial">Ingeniería en Gestión Empresarial</option>
            <option value="Ingeniería Industrial">Ingeniería Industrial</option>
            <option value="Ingeniería en Mecatrónica">Ingeniería en Mecatrónica</option>
            <option value="Licenciatura en Administración">Licenciatura en Administración</option>
            <option value="Licenciatura en Arquitectura">Licenciatura en Arquitectura</option>
          </select>
          {errors.carrera && <span className="error-message">{errors.carrera.message}</span>}
        </div>

        <div className="form-actions">
          <Boton variante="secondary" onClick={onCancel} type="button">Cancelar</Boton>
          <Boton type="submit">{editingAlumno ? 'Actualizar' : 'Guardar'}</Boton>
        </div>
      </form>
    </div>
  );
};

export default AlumnoForm;
