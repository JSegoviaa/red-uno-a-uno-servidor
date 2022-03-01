import { Schema, model, Types } from 'mongoose';

interface Solicitud {
  usuario: Types.ObjectId;
  propietario: Types.ObjectId;
  inmueble: Types.ObjectId;
  estado: Estado;
}

type Estado = 'Aprobado' | 'Rechazado' | 'Pendiente';

const SolicitudSchama = new Schema<Solicitud>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    propietario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    inmueble: { type: Schema.Types.ObjectId, ref: 'Inmueble', required: true },
    estado: { type: String, required: true, default: 'Pendiente' },
  },
  { timestamps: true }
);

SolicitudSchama.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Solicitud = model<Solicitud>('Solicitud', SolicitudSchama);
