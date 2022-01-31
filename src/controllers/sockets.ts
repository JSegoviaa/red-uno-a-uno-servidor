import { Mensaje } from '../models/mensaje';
import { Usuario } from '../models/usuario';

interface Conversacion {
  conversacion: string;
  remitente: string;
  mensaje: string;
  para: string;
}

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

export const guardarMensaje = async (payload: Conversacion) => {
  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return mensaje;
  } catch (error) {
    console.log(error);
    return false;
  }
};
