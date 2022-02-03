import { Request, Response } from 'express';

export const crearPaquete = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Se ha creado el paquete con éxito' });
};

export const obtenerPaquete = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Paquete' });
};

export const obtenerPaquetes = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Paquetes' });
};

export const actualizarPaquete = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Actualizar' });
};
export const eliminarPaquete = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Eliminar' });
};
