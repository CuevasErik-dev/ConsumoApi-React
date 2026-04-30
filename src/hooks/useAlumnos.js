import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API = "http://localhost:8080/alumnos";

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

  // 🔹 Cargar alumnos al iniciar
  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = async () => {
    try {
      const res = await fetch(`${API}/traer-alumnos`);

      // 🔥 VALIDACIÓN REAL (esto evita tu error genérico)
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      setAlumnos(data);

    } catch (error) {
      console.error("Error real:", error);
      toast.error("Error al conectar con el backend");
    }
  };

  // 🔹 AGREGAR
  const addAlumno = async (data) => {
    try {
      const res = await fetch(`${API}/insertar-alumnos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error("Error al guardar");
      }

      toast.success('Alumno registrado');
      cargarAlumnos();

    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar");
    }
  };

  // 🔹 ACTUALIZAR
  const updateAlumno = async (id, data) => {
    try {
      const res = await fetch(`${API}/editar-alumnos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error("Error al actualizar");
      }

      toast.success('Alumno actualizado');
      cargarAlumnos();

    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar");
    }
  };

  // 🔹 ELIMINAR
  const deleteAlumno = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      try {
        const res = await fetch(`${API}/eliminar-alumnos/${id}`, {
          method: "DELETE"
        });

        if (!res.ok) {
          throw new Error("Error al eliminar");
        }

        toast.success('Alumno eliminado');
        cargarAlumnos();

      } catch (error) {
        console.error(error);
        toast.error("No se pudo eliminar");
      }
    }
  };

  return {
    alumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno
  };
};