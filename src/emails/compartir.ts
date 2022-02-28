import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Usuario } from '../models/usuario';

export const compartir = async (req: Request, res: Response) => {
  const { nombre, apellido, titulo, img, id } = req.body;
  const usuario = await Usuario.findById(id);

  const contentHTML = `
    <h1>El usuario ${nombre} ${apellido}</h1>
    <p>Solicita que le compartas el inmueble ${titulo}</p>
    <img src=${img} alt=${titulo} />
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
    to: usuario?.correo,
    subject: `¡${nombre} ${apellido} ha solicitado compartir un inmueble!`,
    html: contentHTML,
  };

  const info = await transport.sendMail(mailOptions);

  if (info.messageId) {
    return res.json({ ok: true, msg: 'Se ha enviado la solicitud. En espera de aprobación' });
  }

  if (!info.messageId) {
    return res.json({
      ok: false,
      msg: 'Error al ponernos en contacto con el promotor. Inténtelo nuevamente',
    });
  }
};
