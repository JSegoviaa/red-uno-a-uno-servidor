import { Request, Response } from 'express';
import { Chat } from '../models/chat';

export const crearChat = async (req: Request, res: Response) => {
  const { remitente, destinatario } = req.body;

  const nuevoChat = new Chat({
    miembros: [remitente, destinatario],
    remitente,
    para: destinatario,
  });

  try {
    const guardarChat = await nuevoChat.save();

    res.status(200).json({
      ok: true,
      msg: 'Se ha iniciado conversación',
      guardarChat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: error });
  }

  res.json({ ok: true, msg: 'Obtener chats', remitente, destinatario });
};

export const obtenerChatsPorUsuario = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const chat = await Chat.find({ miembros: { $in: [uid] } });

    res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ ok: false, msg: error });
  }
};
