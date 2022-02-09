import { Request, Response } from 'express';
import { Paquete } from '../models/paquete';

export const crearPaquete = async (req: Request, res: Response) => {
  const { nombre, descripcion, precioAnual, precioSemestral, precioTrimestral } = req.body;
  const paquete = new Paquete({ nombre, descripcion, precioAnual, precioSemestral, precioTrimestral });

  await paquete.save();

  res.json({ ok: true, msg: 'Se ha creado el paquete con éxito', paquete });
};

export const obtenerPaquete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const paquete = await Paquete.findById(id);

  res.json({ ok: true, msg: '', paquete });
};

export const obtenerPaquetes = async (req: Request, res: Response) => {
  const { desde = 1 } = req.params;
  const paquetes = await Paquete.find().skip(Number(desde));

  res.json({ ok: true, msg: '', paquetes });
};

export const actualizarPaquete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  const paquete = await Paquete.findByIdAndUpdate(id, resto, { new: true });
  res.json({ ok: true, msg: 'El paquete se ha actualizado exitosamente', paquete });
};
export const eliminarPaquete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const paqueteEliminado = await Paquete.findByIdAndDelete(id, { new: true });

  res.json({ ok: true, msg: 'El paquete se ha eliminado exitosamente', paqueteEliminado });
};
