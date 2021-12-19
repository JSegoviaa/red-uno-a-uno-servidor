import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';

export const obtenerUsuarios = async (req: Request, res: Response) => {
  return res.status(400).json({ msg: 'Obtener usuarios' });
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  return res.status(400).json({ msg: 'Obtener usuario', id });
};

export const crearUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, apellido, correo, password, role });

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en la base de datos
  await usuario.save();
  res.status(400).json(usuario);
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, online, correo, ...resto } = req.body;

  if (password) {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(400).json(usuario);
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.status(400).json({ msg: 'Eliminar usuarios', id });
};
