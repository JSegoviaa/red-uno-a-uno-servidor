import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJWT';
import { googleVerify } from '../helpers/googleVerify';

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

export const googleLogin = async (req: Request, res: Response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img, apellido } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        apellido,
        correo,
        password: uuidv4(),
        img,
        google: true,
        role: 'Usuario',
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Token de Google no es válido',
      error,
    });
  }
};
