import { Schema, model } from 'mongoose';

interface Rol {
  role: string;
}

const RoleSchema = new Schema<Rol>({
  role: { type: String, required: [true, 'El rol es obligatorio'] },
});

export const Role = model<Rol>('Role', RoleSchema);
