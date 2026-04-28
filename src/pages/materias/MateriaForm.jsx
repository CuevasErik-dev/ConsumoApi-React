import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materiaSchema } from '../../utils/validations';
import { soloNumeros } from '../../utils/helpers';
import Boton from '../../components/reutilizables/Boton';

const MateriaForm = ({ onSave, editingMateria, onCancel }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(materiaSchema),
    defaultValues: { nombre: '', creditos: '', semestre: '' }
  });

  useEffect(() => {
    if (editingMateria) {
      Object.keys(editingMateria).forEach(key => {
        if (key !== 'id') setValue(key, editingMateria[key]);
      });
    } else {
      reset();
    }
  }, [editingMateria, setValue, reset]);

  const submitForm = (data) => {
    onSave(data);
    reset();
  };

  return (
    <div className="page-card">
      <div className="form-header">{editingMateria ? 'Editar Materia' : 'Agregar Nueva Materia'}</div>
      <form onSubmit={handleSubmit(submitForm)}>
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
          <Boton variante="secondary" onClick={onCancel} type="button">Cancelar</Boton>
          <Boton type="submit">{editingMateria ? 'Actualizar' : 'Guardar'}</Boton>
        </div>
      </form>
    </div>
  );
};

export default MateriaForm;
