import { Schema, model, Types } from 'mongoose';

interface Pedido {
  usuario: Types.ObjectId;
  paquete: Types.ObjectId;
  precio: number;
  totalUsuarios: number;
  importe: number;
  fechaPago: boolean;
  fechaVencimiento: string;
  metodoPago: string;
  vigencia: boolean;
  idStripe: string;
}

const PedidoSchema = new Schema<Pedido>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    paquete: { type: Schema.Types.ObjectId, ref: 'Paquete', required: true },
    precio: { type: Number, required: true },
    totalUsuarios: { type: Number, required: true },
    importe: { type: Number, required: true },
    fechaPago: { type: Boolean, required: true },
    fechaVencimiento: { type: String, required: true },
    metodoPago: { type: String, required: true },
    vigencia: { type: Boolean, required: true },
    idStripe: { type: String, required: true },
  },
  { timestamps: true }
);

export const Pedido = model<Pedido>('Pedido', PedidoSchema);
