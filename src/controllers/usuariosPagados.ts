import { Request, Response } from 'express';
import { UsuarioPagado } from '../models/usuarioPagado';

export const obtenerUsuariosP = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    UsuarioPagado.countDocuments(query),
    UsuarioPagado.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ ok: true, msg: 'Lista de usuarios', total, usuarios });
};

export const obtenerUsuarioP = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuarioPagado = await UsuarioPagado.findById(id);

  res.json({ ok: true, msg: 'Un usuario', usuarioPagado });
};

export const obtenerUsuarioPorDueño = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const { id } = req.params;

  const [total, usuariosPagados] = await Promise.all([
    UsuarioPagado.countDocuments({ usuario: id }),
    UsuarioPagado.find({ usuario: id }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    ok: true,
    total,
    usuariosPagados,
  });
};

export const crearUsuarioP = async (req: Request, res: Response) => {
  const { usuario, nombre, apellido, correo, password } = req.body;

  const usuarioPagado = new UsuarioPagado({ usuario, nombre, apellido, correo, password });

  await usuarioPagado.save();

  res.json({ ok: true, msg: 'Usuario creado con éxito', usuarioPagado });
};

export const actualizarUsuarioP = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ ok: true, msg: 'Actualizar usuario', id });
};

export const eliminarUsuarioP = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ ok: true, msg: 'Eliminar usuario', id });
};
