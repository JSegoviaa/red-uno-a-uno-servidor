import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import { Inmueble } from '../models/inmuebles';
import { v2 } from 'cloudinary';
import { Referencias } from '../models';

export const subirFotoPerfil = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res.status(400).json({ ok: false, msg: 'No existe un usuario con ese id' + id });
  }

  const url = req.file?.path;

  usuario.img = url;

  await usuario.save();

  res.json({
    ok: true,
    msg: 'La foto de perfil se ha subido con éxito',
    usuario,
  });
};

export const imagenesInmueble = async (req: any, res: Response) => {
  const { uid, pid } = req.params;

  const inmueble = await Inmueble.findById(pid);

  if (!inmueble) {
    return res.status(400).json({ ok: false, msg: 'No existe un inmueble con ese id' + uid });
  }

  if (inmueble.imgs.length > 0) {
    inmueble.imgs.map((img) => {
      const nombreArr = img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');
      console.log(public_id);

      v2.uploader.destroy(`red1a1/usuarios/${uid}/inmuebles/${pid}/${public_id}`);
    });
  }

  const files = req.files;

  const imgs = files.map((file: Express.Multer.File) => {
    return file.path;
  });

  inmueble!.imgs = imgs;

  await inmueble?.save();

  res.json({ ok: true, msg: 'Se han subido las imágenes con éxito', imgs });
};

export const actualizarImgs = async (req: any, res: Response) => {
  const { uid, pid } = req.params;

  const inmueble = await Inmueble.findById(pid);

  if (!inmueble) {
    return res.status(400).json({ ok: false, msg: 'No existe un inmueble con ese id' + uid });
  }

  const files = req.files;

  const imgs = files.map((file: Express.Multer.File) => {
    return file.path;
  });

  inmueble!.imgs = imgs;

  await inmueble?.save();

  res.json({ ok: true, msg: 'Se han subido las imágenes con éxito', files: imgs });
};

export const subirVideo = async (req: Request, res: Response) => {
  const { uid, pid } = req.params;
  console.log(req.file?.path, ' ?SDAFa ');

  res.json({ ok: true, msg: 'El vídeo se ha subido exitosamente', pid, uid });
};

export const eliminarImgs = async (req: Request, res: Response) => {
  const { uid, pid } = req.params;
  const { imgs } = req.body;

  imgs.map((img: string) => {
    const nombreArr = img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');

    v2.uploader.destroy(`red1a1/usuarios/${uid}/inmuebles/${pid}/${public_id}`);
  });

  res.json({ ok: true, msg: 'Se han eliminado las imágenes' });
};

export const subirComprobante = async (req: Request, res: Response) => {
  const { rid } = req.params;

  const referencia = await Referencias.findById(rid);

  if (!referencia) {
    return res.status(400).json({ ok: false, msg: 'No existe una referencia con ese id' + rid });
  }

  const url = req.file?.path;

  referencia.comprobante = url;

  await referencia.save();

  res.json({
    ok: true,
    msg: 'El comprobante se ha subido éxitosamente',
    referencia,
  });
};
