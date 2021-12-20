import { NextFunction, Response } from 'express';

export const esAdminRol = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: 'Se quiere verificar el rol sin validar el token' });
  }

  const { role, nombre } = req.usuario;
  if (role !== 'Administrador') {
    return res
      .status(401)
      .json({ msg: `${nombre} no tiene permisos para realizar esa acción` });
  }

  next();
};
