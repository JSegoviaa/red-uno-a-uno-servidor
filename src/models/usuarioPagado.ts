import { Schema, model, Types } from 'mongoose';

interface UsuarioPagado {
  usuario: Types.ObjectId;
  nombre: string;
}

const UsuarioPagadoSchema = new Schema<UsuarioPagado>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre: { type: String, required: true },
  },
  { timestamps: true }
);

UsuarioPagadoSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();

  usuario.uid = _id;

  return usuario;
};

export const UsuarioPagado = model<UsuarioPagado>('UsuariosPagado', UsuarioPagadoSchema);
