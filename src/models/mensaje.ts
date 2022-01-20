import { Schema, model, Types } from "mongoose";

interface Mensaje {
  de: Types.ObjectId;
  para: Types.ObjectId;
  mensaje: string;
}

const MensajeSchema = new Schema<Mensaje>(
  {
    de: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    para: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    mensaje: { type: String, require: true },
  },
  { timestamps: true }
);

export const Mensaje = model<Mensaje>("Mensaje", MensajeSchema);
