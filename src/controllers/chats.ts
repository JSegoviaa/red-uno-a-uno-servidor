import { Request, Response } from "express";

export const obtenerChats = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "Obtener chats" });
};

export const iniciarChat = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "agregar chat" });
};
