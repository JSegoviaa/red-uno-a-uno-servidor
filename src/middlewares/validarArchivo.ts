import { NextFunction, Request, Response } from "express";

export const validarArchivo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file || Object.keys(req.file).length === 0 || !req.file) {
    return res
      .status(400)
      .json({ ok: false, msg: "No se han seleccionado fotos" });
  }

  next();
};
