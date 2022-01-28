import { Request, Response } from 'express';
import { Historial } from '../models/historial';

export const obtenerHistorialPorUsuario = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const { id } = req.params;

  const [total, historialUsuario] = await Promise.all([
    Historial.countDocuments({ usuario: id }),
    Historial.find({ usuario: id })
      .populate('inmueble', ['titulo', 'slug'])
      .skip(Number(desde))
      .limit(Number(limite))
      .sort('-createdAt'),
  ]);

  res.json({
    ok: true,
    total,
    historialUsuario,
  });
};

export const agregarHistorial = async (req: Request, res: Response) => {
  const { usuario, inmueble } = req.body;

  const historial = new Historial({ usuario, inmueble });

  await historial.save();

  res.json({ ok: true, msg: '', historial });
};

export const eliminarHistorial = async (req: Request, res: Response) => {
  const { id } = req.params;

  const historial = await Historial.findByIdAndDelete(id, { new: true });

  res.json({
    ok: true,
    msg: 'Se ha eliminado de tu historial',
    historial,
  });
};
