import { Usuario } from '../models/usuario';

export const usuarioConectado = async (uid: string) => {
  const usuario = await Usuario.findById(uid);

  usuario!.online = true;

  await usuario!.save();
  return usuario;
};

export const usuarioDesconectado = async (uid: string) => {
  const usuario = await Usuario.findById(uid);

  usuario!.online = false;

  await usuario!.save();
  return usuario;
};
