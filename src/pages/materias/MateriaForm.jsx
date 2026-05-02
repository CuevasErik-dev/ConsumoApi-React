import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materiaSchema } from '../../utils/validations';
import { soloNumeros } from '../../utils/helpers';
import Boton from '../../components/reutilizables/Boton';
import { getSemestres } from '../../service/semestreApi';

const MateriaForm = ({ onSave, editingMateria, onCancel }) => {

  const [listaSemestres, setListaSemestres] = useState([]);

  useEffect(() => {
    getSemestres().then(data => setListaSemestres(data)).catch(() => {});
  }, []);

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
      setValue('nombre', editingMateria.nombre || '');
      setValue('creditos', editingMateria.creditos != null ? String(editingMateria.creditos) : '');
      if (typeof editingMateria.semestre === 'object' && editingMateria.semestre !== null) {
        setValue('semestre', Number(editingMateria.semestre.id));
      } else if (editingMateria.semestre) {
        setValue('semestre', Number(editingMateria.semestre));
      } else {
        setValue('semestre', 0);
      }
    } else {
      reset();
    }
  }, [editingMateria, setValue, reset]);

  const submitForm = (data) => {

    if (!data.nombre || !data.creditos || data.semestre === 0) {
      alert("Completa todos los campos");
      return;
    }

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

          {/* SEMESTRE - Carga dinámica desde la BD */}
          <div className="form-group">
            <label>Semestre:</label>
            <select
              className={`input-base ${errors.semestre ? 'input-error' : ''}`}
              {...register('semestre', { valueAsNumber: true })}
            >
              <option value={0}>Seleccione un semestre</option>
              {listaSemestres.map((sem) => (
                <option key={sem.id} value={sem.id}>{sem.nombre}</option>
              ))}
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