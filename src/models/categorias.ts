import { Schema, model } from 'mongoose';

interface Categoria {
  nombre: string;
}

const CategoriaSchema = new Schema<Categoria>({
  nombre: { type: String, required: true, unique: true },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Categoria = model<Categoria>('Categoria', CategoriaSchema);
