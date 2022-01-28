import { Request, Response } from 'express';
import { Mensaje } from '../models/mensaje';

export const obtenerMensajes = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const mensajes = await Mensaje.find({ conversacion: id });

    res.status(200).json({ ok: true, mensajes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

export const crearMensaje = async (req: Request, res: Response) => {
  const { conversacion, remitente, mensaje } = req.body;

  const nuevoMensaje = new Mensaje({ conversacion, remitente, mensaje });

  try {
    const mensajeGuardado = await nuevoMensaje.save();

    res.status(200).json({ ok: true, msg: 'Mensaje enviado', mensajeGuardado });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
};
