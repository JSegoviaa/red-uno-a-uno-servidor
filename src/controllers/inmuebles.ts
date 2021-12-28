import { Response, Request } from 'express';
import { Inmueble } from '../models/inmuebles';

export const obtenerInmuebles = (req: Request, res: Response) => {
  res.json({ msg: 'Obtener todos los inmuebles' });
};

export const obtenerInmueblePorId = (req: Request, res: Response) => {
  res.json({ msg: 'Obtener inmueble' });
};

export const crearInmuebles = async (req: any, res: Response) => {
  const { titulo, descripcion, precio } = req.body;

  const data = { titulo, usuario: req.usuario._id, descripcion, precio };

  const inmueble = new Inmueble(data);

  await inmueble.save();

  res.json({ ok: true, msg: 'Crear inmueble' });
};

export const actualizarInmueble = (req: Request, res: Response) => {
  res.json({ msg: 'Actualizar inmueble' });
};

export const eliminarInmueble = (req: Request, res: Response) => {
  res.json({ msg: 'Eliminar inmueble' });
};
