import { Schema, model, Types } from 'mongoose';

interface Historial {
  usuario: Types.ObjectId;
  inmueble: Types.ObjectId;
}

const HistorialSchema = new Schema<Historial>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    inmueble: { type: Schema.Types.ObjectId, ref: 'Inmueble', required: true },
  },
  { timestamps: true }
);

HistorialSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Historial = model<Historial>('Historial', HistorialSchema);
