import * as z from 'zod';

export const alumnoSchema = z.object({
  imagenURL: z.string().url('Debe ser una URL válida').or(z.literal('')),
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
  numeroControl: z.string()
    .min(8, 'Mínimo 8 números')
    .max(10, 'Máximo 10 números')
    .regex(/^\d+$/, 'Solo números'),
  carrera: z.string().min(1, 'Selecciona una carrera'),
});

export const materiaSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre de la materia es obligatorio')
    .max(35, 'Máximo 35 caracteres'),
  creditos: z.string()
    .min(1, 'Requerido')
    .regex(/^\d+$/, 'Solo números')
    .refine((val) => parseInt(val) >= 1, { message: 'La materia debe tener al menos 1 crédito' }),
  semestre: z.string().min(1, 'Seleccione un semestre'),
});

export const semestreSchema = z.object({
  nombre: z.string()
    .min(3, 'Nombre muy corto')
    .max(25, 'Máximo 25 caracteres'),
});
