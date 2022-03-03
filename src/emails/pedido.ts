import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const nuevoPedido = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, nombrePaquete, precio, importe, idCompra } = req.body;
  const contentHTML = `
    <h1>${nombre} ${apellido}</h1>
    <h2>${nombrePaquete}</h2>
    <h2>${precio}</h2>
    <h2>${importe}</h2>
    <h2>${idCompra}</h2>
`;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: 'Red1a1 <josemanuel@i360.com.mx>',
    to: correo,
    subject: `¡Te has suscrito nuestro plan ${nombrePaquete}!`,
    html: contentHTML,
  };

  const info = await transport.sendMail(mailOptions);

  if (info.messageId) {
    return res.json({ ok: true, msg: '' });
  }

  if (!info.messageId) {
    return res.json({ ok: false, msg: '' });
  }
};

export const nuevoPedidoAdmin = async (req: Request, res: Response) => {
  const { nombre, apellido, nombrePaquete, precio, importe, idCompra } = req.body;
  const contentHTML = `
    <h1>${nombre} ${apellido}</h1>
    <h2>${nombrePaquete}</h2>
    <h2>${precio}</h2>
    <h2>${importe}</h2>
    <h2>${idCompra}</h2>
`;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: 'Red1a1 <josemanuel@i360.com.mx>',
    to: 'acosta.segoviaa@gmail.com, 140300177@ucaribe.edu.mx, acosta.segoviaa@hotmail.com, josemanuel@i360.com.mx',
    subject: `¡${nombre} ${apellido} se ha suscrito al plan ${nombrePaquete}!`,
    html: contentHTML,
  };

  const info = await transport.sendMail(mailOptions);

  if (info.messageId) {
    return res.json({ ok: true, msg: '' });
  }

  if (!info.messageId) {
    return res.json({ ok: false, msg: '' });
  }
};
