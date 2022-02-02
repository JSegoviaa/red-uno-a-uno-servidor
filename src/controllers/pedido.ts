import { Request, Response } from 'express';

export const obtenerPedidos = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener pedidos' });
};

export const obtenerPedido = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener pedido' });
};

export const obtenerPedidoPorUsuario = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Obtener pedido de usuario' });
};

export const crearPedido = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: 'Crear pedido' });
};
