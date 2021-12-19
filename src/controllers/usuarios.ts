import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';

export const obtenerUsuarios = async (req: Request, res: Response) => {
  return res.status(400).json({ msg: 'Obtener usuarios' });
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  return res.status(400).json({ msg: 'Obtener usuario', id });
};

export const crearUsuario = async (req: Request, res: Response) => {
  const body = req.body;
  const usuario = new Usuario(body);

  await usuario.save();
  res.status(400).json(usuario);
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.status(400).json({ msg: 'Actualizar usuarios', id });
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.status(400).json({ msg: 'Eliminar usuarios', id });
};
