import { Request, Response } from "express";
import { Usuario } from "../models/usuario";
import { Inmueble } from "../models/inmuebles";

export const subirFotoPerfil = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res
      .status(400)
      .json({ ok: false, msg: "No existe un usuario con ese id" + id });
  }

  const url = req.file?.path;

  usuario.img = url;

  await usuario.save();

  res.json({
    ok: true,
    msg: "La foto de perfil se ha subido con éxito",
    usuario,
  });
};

export const imagenesInmueble = async (req: any, res: Response) => {
  const { uid, pid } = req.params;

  const inmueble = await Inmueble.findById(pid);

  if (!inmueble) {
    return res
      .status(400)
      .json({ ok: false, msg: "No existe un inmueble con ese id" + uid });
  }

  const files = req.files;

  const imgs = files.map((file: Express.Multer.File) => {
    return file.path;
  });

  inmueble!.imgs = imgs;

  await inmueble?.save();

  res.json({ ok: true, msg: "Se han subido las imágenes con éxito", imgs });
};
