import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';

export const validarJWT = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT!) as any;
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: 'El usuario que intanta hacer esa acción no existe',
      });
    }

    //Vericar que el usuario no haya sido dado de baja
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario que intenta hacer esa acción ha sido dado de baja',
      });
    }

    req.uid = uid;
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
