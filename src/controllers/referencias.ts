import { Request, Response } from 'express';
import { Referencias } from '../models';

export const crearReferencias = async (req: Request, res: Response) => {
  const { usuario, paquete, referencia, precio, importe, totalUsuarios } = req.body;

  try {
    const ref = new Referencias({ usuario, paquete, referencia, precio, importe, totalUsuarios });

    const nuevaRef = await ref.save();

    res.json({ ok: true, msg: 'Se ha creado tú referencia', nuevaRef });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Error al momento de crear referencia. Inténtelo más tarde' });
  }
};

export const obtenerReferenciasUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const referencias = await Referencias.find({ usuario: id }).populate('paquete', 'nombre');

    res.status(200).json({ ok: true, msg: 'Referencias del usuario', referencias });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: 'Error al obtener las referencias del usuario. Inténtelo más tarde' });
  }
};
