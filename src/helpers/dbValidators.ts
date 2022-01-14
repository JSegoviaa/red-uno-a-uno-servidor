import { Categoria } from "../models/categorias";
import { Favorito } from "../models/favoritos";
import { Historial } from "../models/historial";
import { Inmueble } from "../models/inmuebles";
import { Role } from "../models/role";
import { TipoPropiedad } from "../models/tipoPropiedad";
import { Usuario } from "../models/usuario";

export const esRolValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no es válido`);
  }
};

export const existeCorreo = async (correo = "") => {
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

export const existeCategoriaPorId = async (id: string) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`No existe una categoria con ese id ${id}`);
  }
};

export const existeInmueblePorId = async (id: string) => {
  const existeInmueble = await Inmueble.findById(id);
  if (!existeInmueble) {
    throw new Error(`No existe un inmueble con ese id ${id}`);
  }
};

export const existeFavPorId = async (id: string) => {
  const existeFav = await Favorito.findById(id);
  if (!existeFav) {
    throw new Error(`No existe un favorito con ese ${id}`);
  }
};

export const existeHistPorId = async (id: string) => {
  const existeHis = await Historial.findById(id);
  if (!existeHis) {
    throw new Error(`No existe historial con ese ${id}`);
  }
};

export const existeTipoDePropiedadPorId = async (id: string) => {
  const existeTipoPropiedad = await TipoPropiedad.findById(id);
  if (!existeTipoPropiedad) {
    throw new Error(`No existe un tipo de propiedad con ese ${id}`);
  }
};
