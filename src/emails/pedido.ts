import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const contacto = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, nombrePaquete, precio, importe, idCompra } = req.body;
  const contentHTML = `
    <h1>${nombre} ${apellido}</h1>
    <h2>${correo}</h2>
`;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: 'Red1a1 <no-reply>@red1a1.com>',
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
