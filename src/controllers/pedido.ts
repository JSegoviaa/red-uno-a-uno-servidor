import { Request, Response } from 'express';
import { Pedido } from '../models/pedido';

export const obtenerPedidos = async (req: Request, res: Response) => {
  const pedidos = await Pedido.find();

  res.json({ ok: true, msg: 'Obtener pedidos', pedidos });
};

export const obtenerPedido = async (req: Request, res: Response) => {
  const { id } = req.params;

  const pedido = await Pedido.findById(id);

  res.json({ ok: true, msg: 'Obtener pedido', pedido });
};

export const obtenerPedidoPorUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const pedidosUsuario = await Pedido.find({ usuario: id });

  res.json({ ok: true, msg: 'Obtener pedido de usuario', pedidosUsuario });
};

export const crearPedido = async (req: Request, res: Response) => {
  const {
    usuario,
    paquete,
    precio,
    importe,
    fechaPago,
    fechaVencimiento,
    metodoPago,
    vigencia,
    idStripe,
    totalUsuarios,
  } = req.body;

  const pedido = new Pedido({
    usuario,
    paquete,
    precio,
    importe,
    fechaPago,
    fechaVencimiento,
    metodoPago,
    vigencia,
    idStripe,
    totalUsuarios,
  });

  await pedido.save();
  res.json({ ok: true, msg: 'Su paquete ha sido añadido con éxito', pedido });
};
