import { Schema, model, Types } from 'mongoose';

interface Chat {
  miembros: ArrayConstructor;
  remitente: Types.ObjectId;
  para: Types.ObjectId;
}

const ChatSchema = new Schema<Chat>(
  {
    miembros: { type: Array },
    remitente: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    para: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  },
  { timestamps: true }
);

ChatSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Chat = model<Chat>('Chat', ChatSchema);
