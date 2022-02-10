import { Schema, model, Types } from 'mongoose';

interface UsuarioPagado {
  usuario: Types.ObjectId;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  expireAt: any;
  createdAt: any;
}

const UsuarioPagadoSchema = new Schema<UsuarioPagado>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
    expireAt: { type: Date, default: Date.now() + 24 * 60 * 60 * 1000, expires: '1m', required: true },
  },
  { timestamps: true }
);

UsuarioPagadoSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();

  usuario.uid = _id;

  return usuario;
};

UsuarioPagadoSchema.index({ expireAt: 1 }, { expireAfterSeconds: 60 });

export const UsuarioPagado = model<UsuarioPagado>('UsuariosPagado', UsuarioPagadoSchema);
