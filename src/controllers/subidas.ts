import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

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

  res.json({ ok: true, msg: "La foto de perfil se ha subido con éxito" });
};

export const subirLogo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res
      .status(400)
      .json({ ok: false, msg: "No existe un usuario con ese id" + id });
  }

  const url = req.file?.path;
  usuario.logo = url;

  await usuario.save();

  res.json({
    ok: true,
    msg: "El logo de la inmobiliaria se ha subido con éxito",
  });
};
