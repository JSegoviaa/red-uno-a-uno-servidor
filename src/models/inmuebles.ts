import { Schema, model } from "mongoose";

interface Inmueble {
  categoria: any;
  titulo: string;
  publicado: boolean;
  estado: boolean;
  propertyType: string;
  IID: string;
  antiguedad: string;
  m2Construidos: number;
  m2Terreno: number;
  habitaciones: number;
  baños: number;
  medioBaños: number;
  parking: number;
  pisos: number;
  agua: boolean;
  luz: boolean;
  gas: boolean;
  internet: boolean;
  seguridadPrivada: boolean;
  escuelas: boolean;
  mantenimiento: boolean;
  piscinas: boolean;
  discapacitados: boolean;
  amueblado: boolean;
  camas: boolean;
  closet: boolean;
  sala: boolean;
  comedor: boolean;
  cocina: boolean;
  AA: boolean;
  refrigerador: boolean;
  estufa: boolean;
  microondas: boolean;
  minihorno: boolean;
  horno: boolean;
  lavadora: boolean;
  secadora: boolean;
  otros: string;
  descripcion: string;
  precio: number;
  comisiones: number;
  usuario: any;
}

const InmuebleSchema = new Schema<Inmueble>({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, default: 0 },
  publicado: { type: Boolean, default: true, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
  estado: { type: Boolean, default: true, required: true },
  AA: { type: Boolean },
  IID: { type: String },
  agua: { type: Boolean },
  amueblado: { type: Boolean },
  antiguedad: { type: String },
  baños: { type: Number },
  camas: { type: Boolean },
  closet: { type: Boolean },
  cocina: { type: Boolean },
  comedor: { type: Boolean },
  comisiones: { type: Number },
  discapacitados: { type: Boolean },
  escuelas: { type: Boolean },
  estufa: { type: Boolean },
  gas: { type: Boolean },
  habitaciones: { type: Number },
  horno: { type: Boolean },
  internet: { type: Boolean },
  lavadora: { type: Boolean },
  luz: { type: Boolean },
  m2Construidos: { type: Number },
  m2Terreno: { type: Number },
  mantenimiento: { type: Boolean },
  medioBaños: { type: Number },
  microondas: { type: Boolean },
  minihorno: { type: Boolean },
  otros: { type: String },
  parking: { type: Number },
  piscinas: { type: Boolean },
  pisos: { type: Number },
  propertyType: { type: String },
  refrigerador: { type: Boolean },
  sala: { type: Boolean },
  secadora: { type: Boolean },
  seguridadPrivada: { type: Boolean },
});

InmuebleSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export const Inmueble = model<Inmueble>("Inmueble", InmuebleSchema);
