import { Schema, model } from 'mongoose';

interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  img: string | undefined;
  role: string;
  estado: boolean;
  online: boolean;
  google: boolean;
  perfilEmpresarial: string;
  telefonoOficina: string;
  telefonoPersonal: string;
  nombreInmobiliaria: string;
  direccionFisica: string;
  facebookpage: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  logo: string | undefined;
  paqueteAdquirido: string;
  usuarios: number;
  propietario?: string;
  recibirCorreos: boolean;
}

const UsuarioSchema = new Schema<Usuario>({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  apellido: { type: String, required: [true, 'El nombre es obligatorio'] },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
    default: 'https://res.cloudinary.com/du6f7alxg/image/upload/v1643232868/red1a1/usuarios/2_y6iklt.svg',
  },
  role: { type: String, required: true },
  estado: { type: Boolean, default: true },
  online: { type: Boolean, default: false },
  google: { type: Boolean, default: false },
  perfilEmpresarial: { type: String },
  telefonoOficina: { type: String },
  telefonoPersonal: { type: String },
  nombreInmobiliaria: { type: String },
  direccionFisica: { type: String },
  facebookpage: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
  logo: { type: String },
  paqueteAdquirido: { type: String },
  usuarios: { type: Number },
  propietario: { type: String },
  recibirCorreos: { type: Boolean },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();

  usuario.uid = _id;

  return usuario;
};

export const Usuario = model<Usuario>('Usuario', UsuarioSchema);
