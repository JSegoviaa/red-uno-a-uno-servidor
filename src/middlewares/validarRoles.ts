import { NextFunction, Response } from 'express';

export const esAdminRol = (req: any, res: Response, next: NextFunction) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: 'Se quiere verificar el rol sin validar el token' });
  }

  const { role, nombre } = req.usuario;
  if (role !== 'Administrador') {
    return res.status(401).json({
      msg: `${nombre} no tiene permisos de Administrador para realizar esa acción`,
    });
  }

  next();
};

export const tieneRol = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res
        .status(500)
        .json({ msg: 'Se quiere verificar el rol sin validar el token' });
    }

    if (!roles.includes(req.usuario.role)) {
      return res.status(401).json({
        msg: `Para realizar esta acción se requiere alguno de estos roles: ${roles}`,
      });
    }

    next();
  };
};
