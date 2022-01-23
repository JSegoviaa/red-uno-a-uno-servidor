import { Response } from 'express';
import { Mensaje } from '../models/mensaje';

export const obtenerMensajes = async (req: any, res: Response) => {
  const { uid } = req;
  const mensajesDe = req.params.de;

  const last30 = await Mensaje.find({
    $or: [
      { de: uid, para: mensajesDe },
      { de: mensajesDe, para: uid },
    ],
  })
    .sort({ createdAt: 'desc' })
    .limit(30);

  res.json({ ok: true, uid, mensajes: last30, mensajesDe });
};
