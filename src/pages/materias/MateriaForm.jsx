import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materiaSchema } from '../../utils/validations';
import { soloNumeros } from '../../utils/helpers';
import Boton from '../../components/reutilizables/Boton';

const MateriaForm = ({ onSave, editingMateria, onCancel }) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(materiaSchema),
    defaultValues: { nombre: '', creditos: '', semestre: 0 }
  });

  useEffect(() => {
    if (editingMateria) {
      Object.keys(editingMateria).forEach(key => {
        if (key !== 'id') {
          // 🔧 SI ES OBJETO, TOMAR SOLO EL ID
          if (key === 'semestre' && editingMateria.semestre) {
            setValue('semestre', editingMateria.semestre.id);
          } else {
            setValue(key, editingMateria[key]);
          }
        }
      });
    } else {
      reset();
    }
  }, [editingMateria, setValue, reset]);

  const submitForm = (data) => {

    // 🔴 VALIDACIÓN PARA EVITAR NaN
    if (!data.nombre || !data.creditos || data.semestre === 0) {
      alert("Completa todos los campos");
      return;
    }

    // 🔥 YA VIENE COMO NÚMERO (NO MÁS NaN)
    const dataFormateada = {
      nombre: data.nombre,
      creditos: Number(data.creditos),
      semestre: {
        id: data.semestre
      }
    };

    console.log("ENVIANDO:", dataFormateada); // debug

    onSave(dataFormateada);
    reset();
  };

  return (
    <div className="page-card">
      <div className="form-header">
        {editingMateria ? 'Editar Materia' : 'Agregar Nueva Materia'}
      </div>

      <form onSubmit={handleSubmit(submitForm)}>

        <p className="form-section-title">Detalles de la Materia:</p>

        {/* NOMBRE */}
        <div className="form-group">
          <label>Nombre de la Materia:</label>
          <input
            type="text"
            maxLength={35}
            className={`input-base ${errors.nombre ? 'input-error' : ''}`}
            placeholder="ej. Matemáticas Discretas"
            {...register('nombre')}
          />
          {errors.nombre && (
            <span className="error-message">{errors.nombre.message}</span>
          )}
        </div>

        <div className="form-row">

          {/* CREDITOS */}
          <div className="form-group">
            <label>Créditos:</label>
            <input
              type="text"
              maxLength={1}
              className={`input-base ${errors.creditos ? 'input-error' : ''}`}
              placeholder="ej. 5"
              {...register('creditos')}
              onInput={soloNumeros}
            />
            {errors.creditos && (
              <span className="error-message">{errors.creditos.message}</span>
            )}
          </div>

          {/* SEMESTRE */}
          <div className="form-group">
            <label>Semestre:</label>
            <select
              className={`input-base ${errors.semestre ? 'input-error' : ''}`}
              {...register('semestre', { valueAsNumber: true })} // 🔥 CLAVE
            >
              <option value={0}>Seleccione un semestre</option>
              <option value={1}>Primer</option>
              <option value={2}>Segundo</option>
              <option value={3}>Tercer</option>
              <option value={4}>Cuarto</option>
              <option value={5}>Quinto</option>
              <option value={6}>Sexto</option>
              <option value={7}>Séptimo</option>
              <option value={8}>Octavo</option>
              <option value={9}>Noveno</option>
            </select>

            {errors.semestre && (
              <span className="error-message">{errors.semestre.message}</span>
            )}
          </div>

        </div>

        {/* BOTONES */}
        <div className="form-actions">
          <Boton variante="secondary" onClick={onCancel} type="button">
            Cancelar
          </Boton>

          <Boton type="submit">
            {editingMateria ? 'Actualizar' : 'Guardar'}
          </Boton>
        </div>

      </form>
    </div>
  );
};

export default MateriaForm;