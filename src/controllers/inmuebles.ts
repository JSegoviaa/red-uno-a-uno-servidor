import { Response, Request } from "express";
import { v2 } from "cloudinary";
import { Inmueble } from "../models/inmuebles";

export const obtenerInmuebles = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { publicado: true };

  const [total, inmuebles] = await Promise.all([
    Inmueble.countDocuments(query),
    Inmueble.find(query)
      .populate("usuario", ["nombre", "apellido", "correo"])
      .populate("categoria", "nombre")
      .populate("tipoPropiedad", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ ok: true, total, inmuebles });
};

export const obtenerInmueblePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const inmueble = await Inmueble.findById(id)
    .populate("usuario", [
      "nombre",
      "apellido",
      "correo",
      "telefonoPersonal",
      "telefonoOficina",
    ])
    .populate("categoria", "nombre")
    .populate("tipoPropiedad", "nombre");

  res.json({ ok: true, inmueble });
};

export const obtenerInmueblePorDir = async (req: Request, res: Response) => {
  const { direccion } = req.query;

  const inmuebles = await Inmueble.find({ direccion: { $regex: direccion } });
  res.json({ ok: true, inmuebles });
};

export const obtenerInmueblePorURL = async (req: Request, res: Response) => {
  const { id } = req.params;

  const inmueble = await Inmueble.findOne({ slug: id })
    .populate("usuario", [
      "nombre",
      "apellido",
      "correo",
      "telefonoPersonal",
      "telefonoOficina",
      "facebookpage",
      "instagram",
      "twitter",
      "img",
    ])
    .populate("categoria", "nombre")
    .populate("tipoPropiedad", "nombre");

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

  const inmueble = await Inmueble.findById(id);

  if (inmueble!.imgs.length > 0) {
    inmueble!.imgs.map((img) => {
      const nombreArr = img.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");

      v2.uploader.destroy(
        `red1a1/usuarios/${inmueble?.usuario}/inmuebles/${id}/${public_id}`
      );
    });
  }

  const inmuebleBorrado = await Inmueble.findByIdAndDelete(id, { new: true });
  res.json({ ok: true, msg: "Inmueble eliminado con éxito", inmuebleBorrado });
};

export const obtenerInmueblesPorUsuario = async (
  req: Request,
  res: Response
) => {
  const { limite = 20, desde = 0, orden = "createdAt" } = req.query;
  const { id } = req.params;

  const inmueblesUsuario = await Inmueble.find({ usuario: id })
    .skip(Number(desde))
    .limit(Number(limite))
    .sort(orden);

  res.json({
    ok: true,
    inmueblesUsuario,
  });
};
