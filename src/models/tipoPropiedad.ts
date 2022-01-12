import { Schema, model } from "mongoose";

interface TipoPropiedad {
  nombre: string;
}

const TipoPropiedadSchema = new Schema<TipoPropiedad>(
  {
    nombre: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

TipoPropiedadSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const TipoPropiedad = model<TipoPropiedad>(
  "TipoPropiedad",
  TipoPropiedadSchema
);
