import { Schema, model } from 'mongoose';

interface Inmueble {
  titulo: string;
  usuario: any;
  descripcion: string;
  precio: number;
  publicado: boolean;
  categoria: any;
  estado: boolean;
}

const InmuebleSchema = new Schema<Inmueble>({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, default: 0 },
  publicado: { type: Boolean, default: true, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  estado: { type: Boolean, default: true, required: true },
});

InmuebleSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export const Inmueble = model<Inmueble>('Inmueble', InmuebleSchema);
