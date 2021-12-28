import { Response, Request } from 'express';
import { Categoria } from '../models/categorias';

export const obtenerCategorias = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener categorias' });
};

export const obtenerCategoria = (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener categoria' });
};

export const crearCategoria = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      ok: false,
      msg: `La categoria ${categoriaDB} ya ha sido creada`,
    });
  }

  const categoria = new Categoria({ nombre });

  await categoria.save();

  res
    .status(201)
    .json({ ok: true, msg: 'Categoría creada con éxito', categoria });
};

export const actualizarCategoria = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Actualizar categoria' });
};

export const eliminarCategoria = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Eliminar categoria' });
};
