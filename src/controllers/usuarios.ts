import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJWT';

export const obtenerUsuarios = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return;
  const usuario = await Usuario.findById(id);

  res.json(usuario);
};

export const crearUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, apellido, correo, password, role });

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Generar JWT
  const token = await generarJWT(usuario.id);

  //Guardar en la base de datos
  await usuario.save();
  res.json({ ok: true, msg: 'Se ha creado usuario con éxito', token, usuario });
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, online, correo, ...resto } = req.body;

  if (password) {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    ok: true,
    usuario,
    msg: 'Se ha actualizado el perfil de usuario',
  });
};

export const actualizarRolUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role, paqueteAdquirido, usuarios } = req.body;

  const usuario = await Usuario.findByIdAndUpdate(id, { role, paqueteAdquirido, usuarios }, { new: true });

  res.json({ ok: true, msg: `Se ha añadido el paquete ${role} a tu cuenta`, usuario });
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};
