import { Role } from '../models/role';

export const esRolValido = async (role = '') => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no es válido`);
  }
};
