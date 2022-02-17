import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const contacto = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, telefono, mensaje } = req.body;
  const contentHTML = `
    <h1>${nombre} ${apellido}</h1>
    <h2>${correo}</h2>
    <h2>${telefono}</h2>
    <p>${mensaje}</p>
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
    from: 'Red1a1 <no-reply@red1a1.com>',
    to: process.env.SMTP_ENVIAR_A,
    subject: `¡${nombre} ${apellido} se ha puesto en contacto!`,
    html: contentHTML,
  };

  const info = await transport.sendMail(mailOptions);

  if (info.messageId) {
    return res.json({ ok: true, msg: 'Gracias por ponerte en contacto' });
  }

  if (!info.messageId) {
    return res.json({
      ok: false,
      msg: 'Error al enviar el mensaje. Inténtelo nuevamente',
    });
  }
};
