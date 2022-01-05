import { Response, Request } from "express";
import { Inmueble } from "../models/inmuebles";

export const obtenerInmuebles = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { publicado: true };

  const [total, inmuebles] = await Promise.all([
    Inmueble.countDocuments(query),
    Inmueble.find(query)
      .populate("usuario", ["nombre", "apellido", "correo"])
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ ok: true, total, inmuebles });
};

export const obtenerInmueblePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const inmueble = await Inmueble.findById(id)
    .populate("usuario", ["nombre", "apellido", "correo"])
    .populate("categoria", "nombre");

  res.json({ ok: true, inmueble });
};

export const crearInmuebles = async (req: any, res: Response) => {
  const { publicado, estado, usuario, ...body } = req.body;

  const data = {
    ...body,
    titulo: body.titulo,
    usuario: req.usuario._id,
  };

  const inmueble = new Inmueble(data);

  await inmueble.save();

  res.json({
    ok: true,
    msg: "Se ha creado el inmueble exitosamente",
    inmueble,
  });
};

export const actualizarInmueble = async (req: any, res: Response) => {
  const { id } = req.params;
  const { usuario, estado, ...data } = req.body;

  data.usuario = req.usuario._id;

  const inmueble = await Inmueble.findByIdAndUpdate(id, data, { new: true });
  res.json({ ok: true, msg: "Inmueble actualizado exitosamente", inmueble });
};

export const eliminarInmueble = async (req: Request, res: Response) => {
  const { id } = req.params;

  const inmuebleBorrado = await Inmueble.findByIdAndDelete(id, { new: true });
  res.json({ ok: true, msg: "Inmueble eliminado con éxito", inmuebleBorrado });
};

export const obtenerInmueblesPorUsuario = async (
  req: Request,
  res: Response
) => {
  const { limite = 20, desde = 0 } = req.query;
  const { id } = req.params;

  const inmueblesUsuario = await Inmueble.find({ usuario: id })
    .skip(Number(desde))
    .limit(Number(limite));

  res.json({
    ok: true,
    inmueblesUsuario,
  });
};
