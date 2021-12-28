import { Response, Request } from 'express';

export const obtenerCategorias = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener categorias' });
};

export const obtenerCategoria = (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener categoria' });
};

export const crearCategoria = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Crear categoría' });
};

export const actualizarCategoria = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Actualizar categoria' });
};

export const eliminarCategoria = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Eliminar categoria' });
};
