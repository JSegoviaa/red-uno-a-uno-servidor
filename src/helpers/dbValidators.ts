import { Role } from '../models/role';
import { Usuario } from '../models/usuario';

export const esRolValido = async (role = '') => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no es válido`);
  }
};

export const existeCorreo = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo electrónico ingresado ya ha sido registrado`);
  }
};

export const existeUsuarioPorId = async (id: string) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`No existe un usuario con ese id ${id}`);
  }
};
