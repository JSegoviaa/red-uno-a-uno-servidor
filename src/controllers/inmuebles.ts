import { Response, Request } from 'express';

export const obtenerInmuebles = (req: Request, res: Response) => {
  res.json({ msg: 'Obtener todos los inmuebles' });
};

export const obtenerInmueblePorId = (req: Request, res: Response) => {
  res.json({ msg: 'Obtener inmueble' });
};

export const crearInmuebles = (req: Request, res: Response) => {
  res.json({ msg: 'Crear inmueble' });
};

export const actualizarInmueble = (req: Request, res: Response) => {
  res.json({ msg: 'Actualizar inmueble' });
};

export const eliminarInmueble = (req: Request, res: Response) => {
  res.json({ msg: 'Eliminar inmueble' });
};
