import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const inmuebleZona = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, tituloInmueble, imgInmueble, slug } = req.body;
  const contentHTML = `
    <h1>${nombre} ${apellido}</h1>
    <h2>Se ha publicado el siguiente inmueble ${tituloInmueble}</h2>
    <a  target="_blank" 
        href={"https://red1a1.com/app/propiedades/${slug}}">
        https://red1a1.com/app/propiedades/${slug}
    </a>
    <img src=${imgInmueble} alt=${tituloInmueble} />
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
    subject: `¡${nombre} ${apellido}, se ha publicado un inmueble en tu zona!`,
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
