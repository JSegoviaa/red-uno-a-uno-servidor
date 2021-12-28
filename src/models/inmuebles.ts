import { Schema, model } from 'mongoose';

interface Inmueble {
  titulo: string;
  usuario: any;
  descripcion: string;
  precio: number;
  publicado: boolean;
}

const InmuebleSchema = new Schema<Inmueble>({
  titulo: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  descripcion: { type: String },
  precio: { type: Number },
  publicado: { type: Boolean, default: true },
});

export const Inmueble = model<Inmueble>('Inmueble', InmuebleSchema);
