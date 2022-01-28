import { Schema, model } from 'mongoose';

interface Chat {
  miembros: ArrayConstructor;
}

const ChatSchema = new Schema<Chat>(
  {
    miembros: { type: Array },
  },
  { timestamps: true }
);

ChatSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Chat = model<Chat>('Chat', ChatSchema);
