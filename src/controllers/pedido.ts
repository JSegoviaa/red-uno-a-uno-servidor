import { Request, Response } from 'express';
// import Stripe from 'stripe';
import { Pedido } from '../models/pedido';
// const stripe = new Stripe('', { typescript: true, apiVersion: '2020-08-27' });

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
  const { usuario, paquete, precio, fechaPago, fechaVencimiento, metodoPago, vigencia, totalUsuarios, idStripe } =
    req.body;

  const importe = totalUsuarios * precio;

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: importe,
  //   currency: 'mxn',
  //   automatic_payment_methods: { enabled: true },
  // });

  const pedido = new Pedido({
    usuario,
    paquete,
    precio,
    importe: importe,
    // importe: paymentIntent.amount,
    fechaPago,
    // fechaPago: paymentIntent.created,
    fechaVencimiento,
    metodoPago,
    vigencia,
    // idStripe: paymentIntent.id,
    idStripe,
    totalUsuarios,
  });

  await pedido.save();
  res.json({ ok: true, msg: 'Su paquete ha sido añadido con éxito', pedido });
};
