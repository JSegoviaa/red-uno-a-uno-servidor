import { Schema, model, Types } from 'mongoose';

interface Compartido {
  usuario: Types.ObjectId;
  propietario: Types.ObjectId;
  inmueble: Types.ObjectId;
  estado: boolean;
}

const CompartidoSchema = new Schema<Compartido>({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  propietario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  inmueble: { type: Schema.Types.ObjectId, ref: 'Inmueble', required: true },
  estado: { type: Boolean, required: true, default: false },
});

CompartidoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Compartido = model<Compartido>('Compartido', CompartidoSchema);
