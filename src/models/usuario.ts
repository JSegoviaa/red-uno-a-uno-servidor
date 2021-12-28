import { Schema, model } from 'mongoose';

interface Location {
  lng: number;
  lat: number;
}

interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  img: string;
  role: string;
  estado: boolean;
  online: boolean;
  google: boolean;
  perfilEmpresarial: string;
  telefonoOficina: string;
  telefonoPersonal: string;
  nombreInmobiliaria: string;
  direccionFisica: string;
  coordenadas: Location;
  facebookpage: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  logo: string;
  inmuebles: any;
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
  img: { type: String },
  role: { type: String, required: true },
  estado: { type: Boolean, default: true },
  online: { type: Boolean, default: false },
  google: { type: Boolean, default: false },
  perfilEmpresarial: { type: String },
  telefonoOficina: { type: String },
  telefonoPersonal: { type: String },
  nombreInmobiliaria: { type: String },
  direccionFisica: { type: String },
  coordenadas: { type: Number },
  facebookpage: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
  logo: { type: String },
  inmuebles: [{ type: Schema.Types.ObjectId, ref: 'Inmueble' }],
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();

  usuario.uid = _id;

  return usuario;
};

export const Usuario = model<Usuario>('Usuario', UsuarioSchema);
