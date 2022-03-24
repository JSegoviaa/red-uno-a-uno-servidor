import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const bienvenida = async (req: Request, res: Response) => {
  const { nombre, apellido, correo } = req.body;
  const contentHTML = `
    <h1>${nombre} ${apellido} bienvenido a Red1a1</h1>
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
    subject: `¡${nombre} ${apellido} bienvenido a Red1a1!`,
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
