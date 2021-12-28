import { Schema, model } from 'mongoose';

interface Categoria {
  nombre: string;
}

const CategoriaSchema = new Schema<Categoria>({
  nombre: { type: String, required: true, unique: true },
});

export const Categoria = model<Categoria>('Categoria', CategoriaSchema);
