import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { v2 } from 'cloudinary';
v2.config({
  cloud_name: 'du6f7alxg',
  api_key: '575558682358524',
  api_secret: '575558682358524',
});
import { subirArchivo } from '../helpers/subirImagen';
import { Usuario } from '../models/usuario';

export const subirImagen = async (req: Request, res: Response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, 'usuarios/imgs');
    res.json({ ok: true, nombre });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const actualizarImagen = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);
  if (!usuario) {
    return res
      .status(400)
      .json({ ok: false, msg: 'No existe un usuario con ese id' + id });
  }

  if (usuario.img) {
    const pathImagen = path.join(__dirname, `../uploads`);

    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, `usuarios/${id}`);

  usuario.img = nombre;

  await usuario.save();

  res.json(usuario);
};

export const actualizarImagenCloudinary = async (req: any, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);
  if (!usuario) {
    return res
      .status(400)
      .json({ ok: false, msg: 'No existe un usuario con ese id' + id });
  }

  if (usuario.img) {
    const nombreArr = usuario.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    v2.uploader.destroy(public_id);
  }

  try {
    const { name } = req.files.imagen;
    console.log(req.files.imagen);
    const { secure_url } = await v2.uploader.upload(name, {
      folder: 'red1d1/usuarios/' + id,
    });
    usuario.img = secure_url;

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    res.json(error);
  }
};
