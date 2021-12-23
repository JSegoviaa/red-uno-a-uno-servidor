import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJWT';

export const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'El correo electrónico ingresado es incorrecto',
        ok: false,
      });
    }

    //Verificar si el usuario sigue activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Esa cuenta ha sido dada de baja',
      });
    }

    //Validar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'La contraseña ingresada es incorrecta',
        ok: false,
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({ ok: true, usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json().json({
      msg: 'Algo salió mal. Pónganse en contacto con el administrador',
      ok: false,
    });
  }
};

export const renovarToken = async (req: any, res: Response) => {
  const uid = req.uid;
  //Geberar JWT

  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  res.json({ ok: true, usuario, token });
};
