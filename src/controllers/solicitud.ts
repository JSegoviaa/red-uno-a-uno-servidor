import { Request, Response } from 'express';
import { Solicitud } from '../models';

export const obtenerSolicitudesUsuario = async (req: Request, res: Response) => {
  const { id, limite = 5 } = req.params;

  const [total, solicitudes] = await Promise.all([
    Solicitud.countDocuments({ propietario: id }),
    Solicitud.find({ propietario: id })
      .populate('inmueble', ['titulo', 'slug'])
      .populate('usuario', ['nombre', 'apellido'])
      .sort('-createdAt')
      .limit(Number(limite)),
  ]);

  res.json({ ok: true, solicitudes, total, msg: 'Lista de solicitudes' });
};

export const solicitarInmueble = async (req: Request, res: Response) => {
  const { usuario, propietario, inmueble } = req.body;

  const existeSolicitud = await Solicitud.findOne({ usuario, inmueble, propietario });

  if (existeSolicitud) {
    return res.status(400).json({ ok: false, msg: 'Ya has solicitud compartir este inmueble' });
  }

  const solicitud = new Solicitud({ usuario, propietario, inmueble });

  await solicitud.save();

  res.json({ ok: true, msg: 'Se ha enviado solicitud', solicitud });
};

export const aceptarSolicitud = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Haz aceptado la solicitud' });
};

export const rechazarSolicitud = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Haz rechazado la solicitud' });
};
