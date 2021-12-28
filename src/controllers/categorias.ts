import { Response, Request } from 'express';
import { Categoria } from '../models/categorias';

export const obtenerCategorias = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ ok: true, total, categorias });
};

export const obtenerCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);

  res.json({ ok: true, categoria });
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
  const { id } = req.params;
  const data = req.body;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json({
    ok: true,
    msg: 'La categoría se ha actualizado con éxito',
    categoria,
  });
};

export const eliminarCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndDelete(id, { new: true });

  res.json({
    ok: true,
    msg: 'La categoría se ha eliminado con éxito',
    categoria,
  });
};
