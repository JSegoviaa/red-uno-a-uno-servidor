import { Schema, model, Types } from 'mongoose';

interface Referencias {
  usuario: Types.ObjectId;
  paquete: Types.ObjectId;
  referencia: string;
  precio: number;
  totalUsuarios: { type: Number };
  importe: { type: Number; required: true };
  estado: boolean;
  comprobante: string | undefined;
}

const ReferenciasSchema = new Schema<Referencias>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    paquete: { type: Schema.Types.ObjectId, ref: 'Paquete', required: true },
    referencia: { type: String, required: true },
    precio: { type: Number, required: true },
    importe: { type: Number, required: true },
    totalUsuarios: { type: Number },
    estado: { type: Boolean, required: true, default: false },
    comprobante: { type: String },
  },
  { timestamps: true }
);

ReferenciasSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Referencias = model<Referencias>('Referencia', ReferenciasSchema);
