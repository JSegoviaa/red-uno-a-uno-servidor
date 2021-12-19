import { Schema, model } from 'mongoose';

interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  img: string;
  role: string;
  estado: boolean;
  online: boolean;
  google: boolean;
}

const UsuarioSchema = new Schema<Usuario>({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  apellido: { type: String, required: [true, 'El nombre es obligatorio'] },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: { type: String },
  role: { type: String, required: true },
  estado: { type: Boolean, default: true },
  online: { type: Boolean, default: false },
  google: { type: Boolean, default: false },
});

export const Usuario = model<Usuario>('Usuario', UsuarioSchema);
