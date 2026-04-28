import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { semestreSchema } from '../../utils/validations';
import Boton from '../../components/reutilizables/Boton';

const SemestreForm = ({ onSave, editingSemestre, onCancel }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(semestreSchema),
    defaultValues: { nombre: '' }
  });

  useEffect(() => {
    if (editingSemestre) {
      Object.keys(editingSemestre).forEach(key => {
        if (key !== 'id') setValue(key, editingSemestre[key]);
      });
    } else {
      reset();
    }
  }, [editingSemestre, setValue, reset]);

  const submitForm = (data) => {
    onSave(data);
    reset();
  };

  return (
    <div className="page-card">
      <div className="form-header">{editingSemestre ? 'Editar Semestre' : 'Agregar Nuevo Semestre'}</div>
      <form onSubmit={handleSubmit(submitForm)}>
        <p className="form-section-title">Detalles del Semestre:</p>
        <div className="form-group">
          <label>Nombre del Semestre:</label>
          <input type="text" maxLength={25} className={`input-base ${errors.nombre ? 'input-error' : ''}`}
            placeholder="ej. Primer Semestre" {...register('nombre')} />
          {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
        </div>

        <div className="form-actions">
          <Boton variante="secondary" onClick={onCancel} type="button">Cancelar</Boton>
          <Boton type="submit">{editingSemestre ? 'Actualizar Semestre' : 'Guardar Semestre'}</Boton>
        </div>
      </form>
    </div>
  );
};

export default SemestreForm;
