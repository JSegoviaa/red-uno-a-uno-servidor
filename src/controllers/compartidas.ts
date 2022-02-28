import { Request, Response } from 'express';

export const obtenerInmueblesCompartidos = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener inmuebles compartidos' });
};

export const obtenerMisInmueblesCompartidos = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener mis inmuebles compartidos' });
};

export const compartirInmueble = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Compartir inmueble' });
};

export const aceptarCompartir = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Haz aceptado la solicitud' });
};

export const rechazarCompartir = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Haz rechazado la solicitud' });
};
