import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Pedido } from '../models/pedido';

const stripe = new Stripe(
  'sk_test_51JaTznCGqe3RvXVDn9Hj9XKJFptPF97YIdCUipNFQFkilIpPiHXb9QDkao19oEHQatkY8HAWo6WZm0F6GrPpe8Mv00hhq1gz9W',
  { typescript: true, apiVersion: '2020-08-27' }
);

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
  const { desde = 0, limite = 15 } = req.query;

  // const pedidosUsuario = await Pedido.find({ usuario: id }).populate('paquete', 'nombre').sort('-createdAt');

  // res.json({ ok: true, msg: 'Obtener pedido de usuario', pedidosUsuario });

  const [total, pedidosUsuario] = await Promise.all([
    Pedido.countDocuments({ usuario: id }),
    Pedido.find({ usuario: id })
      .populate('paquete', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite))
      .sort('-createdAt'),
  ]);

  res.json({
    ok: true,
    total,
    pedidosUsuario,
  });
};

export const crearPedido = async (req: Request, res: Response) => {
  const {
    usuario,
    paquete,
    precio,
    fechaPago,
    fechaVencimiento,
    metodoPago,
    vigencia,
    totalUsuarios,
    importe,
    idPago,
  } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: importe * 100,
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
      payment_method: idPago,
      confirm: true,
      return_url: 'https://www.google.com/' /*Cambiar al dominio de red1a1 cuando sea https*/,
    });

    const pedido = new Pedido({
      usuario,
      paquete,
      precio,
      importe,
      fechaPago,
      fechaVencimiento,
      metodoPago,
      vigencia,
      idPago: paymentIntent.id,
      totalUsuarios,
    });

    await pedido.save();
    res.json({
      ok: true,
      msg: 'Su paquete ha sido añadido con éxito',
      pedido,
    });
  } catch (error: any) {
    switch (error.raw.decline_code || error.raw.code) {
      case 'insufficient_funds':
        return res.json({ ok: false, msg: 'Fondos insuficientes. Inténtelo con otra tarjeta' });

      case 'card_declined':
        return res.json({ ok: false, msg: 'Su tarjeta ha sido rechazada. Inténtelo con otra tarjeta' });

      case 'expired_card':
        return res.json({ ok: false, msg: 'Su tarjeta ha caducado. Inténtelo con otra tarjeta' });

      case 'processing_error':
        return res.json({
          ok: false,
          msg: 'Hubo un error al momento de procesar el pago. Inténtelo nuevamente más tarde',
        });

      case 'incorrect_cvc':
        return res.json({ ok: false, msg: 'Código de seguridad incorrecto. Inténtelo nuevamente' });

      case 'incorrect_number':
        return res.json({ ok: false, msg: 'El número de tarjeta no es correcto. Inténtelo de nuevo' });

      default:
        return res.json({ ok: false, msg: error.raw.message });
    }
  }
};

export const crearPedidoRef = async (req: Request, res: Response) => {
  const {
    usuario,
    paquete,
    precio,
    fechaPago,
    fechaVencimiento,
    metodoPago,
    vigencia,
    totalUsuarios,
    importe,
    idPago,
  } = req.body;

  try {
    const pedido = new Pedido({
      usuario,
      paquete,
      precio,
      importe,
      fechaPago,
      fechaVencimiento,
      metodoPago,
      vigencia,
      idPago,
      totalUsuarios,
    });

    await pedido.save();
    res.status(200).json({
      ok: true,
      msg: 'Se ha agregado paquete al usuario',
      pedido,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: 'Hubo un error al momento de aprobar al pago. Inténtelo nuevamente' });
  }
};
