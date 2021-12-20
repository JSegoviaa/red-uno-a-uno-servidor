import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT!) as any;
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
