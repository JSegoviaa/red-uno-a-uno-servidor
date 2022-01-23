import { Schema, model, Types } from 'mongoose';

interface Chat {
  remitente: Types.ObjectId;
  destinatario: Types.ObjectId;
}

const ChatSchema = new Schema<Chat>(
  {
    remitente: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    destinatario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
  },
  { timestamps: true }
);

ChatSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Favorito = model<Chat>('Chat', ChatSchema);
