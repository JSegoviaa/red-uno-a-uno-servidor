import { Schema, model } from 'mongoose';

interface Paquete {
  nombre: string;
  descripcion: string;
  precioAnual: number;
  precioSemestral: number;
  precioTrimestral: number;
}

const PaqueteSchema = new Schema<Paquete>(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precioAnual: { type: Number, required: true },
    precioSemestral: { type: Number, required: true },
    precioTrimestral: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Paquete = model<Paquete>('Paquete', PaqueteSchema);
