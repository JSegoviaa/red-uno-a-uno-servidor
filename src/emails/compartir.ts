import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Usuario } from '../models/usuario';

export const compartir = async (req: Request, res: Response) => {
  const { nombre, apellido, titulo, img, id, slug } = req.body;
  const usuario = await Usuario.findById(id);

  const contentHTML = `
    <h1>El usuario ${nombre} ${apellido}</h1>
    <p>Solicita que le compartas el inmueble ${titulo}</p>
    <a  target="_blank" 
        href={"https://red1a1.com/app/propiedades/${slug}}">
        https://red1a1.com/app/propiedades/${slug}
    </a>
    <img src=${img} alt=${titulo} />
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

export const solicitudAprobada = async (req: Request, res: Response) => {
  const { nombre, apellido, titulo, img, correo } = req.body;

  const contentHTML = `
    <h1>${nombre} ${apellido} ha aprobado tu solicitud</h1>
    <p>Ahora puedes compartir el inmueble ${titulo}</p>
    <img src=${img} alt=${titulo} />
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
    subject: `¡Tu solicitud ha sido aprobada!`,
    html: contentHTML,
  };

  const info = await transport.sendMail(mailOptions);

  if (info.messageId) {
    return res.json({ ok: true, msg: '' });
  }

  if (!info.messageId) {
    return res.json({
      ok: false,
      msg: '',
    });
  }
};

export const solicitudRechazada = async (req: Request, res: Response) => {
  const { nombre, apellido, titulo, img, correo } = req.body;

  const contentHTML = `
    <h1>${nombre} ${apellido} ha rechazado tu solicitud</h1>
    <p>No puedes compartir el inmueble ${titulo}</p>
    <p>Te recomendamos que te pongas en contacto con el dueño para más información</p>
    <img src=${img} alt=${titulo} />
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
    subject: `¡Tu solicitud ha sido rechazada!`,
    html: contentHTML,
  };

  const info = await transport.sendMail(mailOptions);

  if (info.messageId) {
    return res.json({ ok: true, msg: '' });
  }

  if (!info.messageId) {
    return res.json({
      ok: false,
      msg: '',
    });
  }
};
