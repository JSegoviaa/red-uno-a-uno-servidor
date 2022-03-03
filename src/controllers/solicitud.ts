import { Request, Response } from 'express';
import { Solicitud } from '../models';

export const obtenerSolicitudesPropietario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { limite = 5, estado = 'Pendiente' } = req.query;

  const [total, solicitudes] = await Promise.all([
    Solicitud.countDocuments({ propietario: id, estado }),
    Solicitud.find({ propietario: id, estado })
      .populate('inmueble', ['titulo', 'slug', 'imgs'])
      .populate('usuario', ['nombre', 'apellido', 'correo'])
      .populate('propietario', ['nombre', 'apellido'])
      .sort('-createdAt')
      .limit(Number(limite)),
  ]);

  res.json({ ok: true, solicitudes, total, msg: 'Lista de solicitudes' });
};

export const obtenerSolicitudesUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { limite = 20, desde = 0, estado } = req.query;

  try {
    const [total, compartidas] = await Promise.all([
      Solicitud.countDocuments({ usuario: id, estado }),
      Solicitud.find({ usuario: id, estado })
        .populate('inmueble', ['titulo', 'slug', 'imgs'])
        .populate('propietario', ['nombre', 'apellido'])
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({ ok: true, compartidas, total, msg: 'Lista de solicitudes' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Error en el servidor. Hable con el adminsitrador' });
  }
};

export const solicitarInmueble = async (req: Request, res: Response) => {
  const { usuario, propietario, inmueble } = req.body;

  const existeSolicitud = await Solicitud.findOne({
    usuario,
    inmueble,
    propietario,
    estado: 'Aprobado',
  });

  if (existeSolicitud) {
    return res.status(400).json({ ok: false, msg: 'Ya has solicitud compartir este inmueble' });
  }

  const solicitud = new Solicitud({ usuario, propietario, inmueble });

  await solicitud.save();

  res.json({ ok: true, msg: 'Se ha enviado solicitud', solicitud });
};

export const aceptarSolicitud = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { usuario, inmueble, ...resto } = req.body;

  try {
    const solicitudActualizar = await Solicitud.findByIdAndUpdate(id, resto, { new: true });
    res.json({ ok: true, solicitudActualizar, msg: 'Haz aceptado la solicitud' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'No se pudo aceptar la solicitud. Inténtelo más tarde' });
  }
};

export const rechazarSolicitud = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { usuario, inmueble, ...resto } = req.body;

  try {
    const solicitudActualizar = await Solicitud.findByIdAndUpdate(id, resto, { new: true });
    res.json({ ok: true, solicitudActualizar, msg: 'Haz rechazado la solicitud' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'No se pudo rechazar la solicitud. Inténtelo más tarde' });
  }
};
