import { Request, Response } from 'express';

export const obtenerUsuariosP = (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Lista de usuarios' });
};

export const obtenerUsuarioP = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ ok: true, msg: 'Un usuario', id });
};

export const crearUsuarioP = (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Crear usuario' });
};

export const actualizarUsuarioP = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ ok: true, msg: 'Actualizar usuario', id });
};

export const eliminarUsuarioP = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ ok: true, msg: 'Eliminar usuario', id });
};
