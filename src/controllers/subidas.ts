import { Request, Response } from "express";

export const actualizarImagenUsuario = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "Se ha subido imagen" });
};
