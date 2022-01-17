import { NextFunction, Request, Response } from 'express';

export const validarArchivo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
    return res
      .status(400)
      .json({ ok: false, msg: 'No se han seleccionado fotos' });
  }

  next();
};
