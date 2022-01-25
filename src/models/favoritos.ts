import { Schema, model, Types } from "mongoose";

type Solicitud = "Pendiente" | "Aprobado" | "Rechazado";

interface Favorito {
  usuario: Types.ObjectId;
  inmueble: Types.ObjectId;
  solicitud: Solicitud;
  propietario: Types.ObjectId;
}

const FavoritoSchema = new Schema<Favorito>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    inmueble: { type: Schema.Types.ObjectId, ref: "Inmueble", required: true },
    solicitud: { type: String, required: true, default: "Pendiente" },
    propietario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

FavoritoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Favorito = model<Favorito>("Favorito", FavoritoSchema);
