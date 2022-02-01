import { Request, Response } from 'express';
import { Chat } from '../models/chat';

export const crearChat = async (req: Request, res: Response) => {
  const { remitente, destinatario } = req.body;

  const existeChatDe = await Chat.findOne({ remitente, para: destinatario });
  const existeChatPara = await Chat.findOne({ remitente: destinatario, para: remitente });

  if (existeChatDe || existeChatPara) {
    return res.json({ ok: false, msg: 'Ya has iniciado una conversación con esa persona' });
  }

  const nuevoChat = new Chat({
    miembros: [remitente, destinatario],
    remitente,
    para: destinatario,
  });

  const guardarChat = await nuevoChat.save();

  res.status(200).json({
    ok: true,
    msg: 'Se ha iniciado conversación',
    guardarChat,
  });
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
