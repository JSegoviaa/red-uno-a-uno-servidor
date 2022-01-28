import { Schema, model } from 'mongoose';

interface Mensaje {
  conversacion: string;
  remitente: string;
  mensaje: string;
}

const MensajeSchema = new Schema<Mensaje>(
  {
    conversacion: { type: String },
    remitente: { type: String },
    mensaje: { type: String },
  },
  { timestamps: true }
);

export const Mensaje = model<Mensaje>('Mensaje', MensajeSchema);
