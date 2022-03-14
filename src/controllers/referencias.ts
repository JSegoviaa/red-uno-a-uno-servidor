import { Request, Response } from 'express';
import { Referencias } from '../models';

export const crearReferencias = async (req: Request, res: Response) => {
  const { usuario, paquete, referencia, precio, importe, totalUsuarios, estado } = req.body;

  try {
    const ref = new Referencias({ usuario, paquete, referencia, precio, importe, totalUsuarios, estado });

    const nuevaRef = await ref.save();

    res.json({ ok: true, msg: 'Se ha creado tú referencia', nuevaRef });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Error al momento de crear referencia. Inténtelo más tarde' });
  }
};

export const obtenerReferenciasUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { desde = 0, limite = 15 } = req.query;

  try {
    const [total, referencias] = await Promise.all([
      Referencias.countDocuments({ usuario: id }),
      Referencias.find({ usuario: id })
        .populate('paquete', 'nombre')
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
        .sort('-createdAt'),
    ]);

    res.status(200).json({ ok: true, msg: 'Referencias del usuario', referencias, total });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: 'Error al obtener las referencias del usuario. Inténtelo más tarde' });
  }
};

export const obtenerReferenciaPorNumero = async (req: Request, res: Response) => {
  const { numero } = req.query;

  try {
    const referencia = await Referencias.findOne({ referencia: numero })
      .populate('usuario', ['nombre', 'apellido', 'correo', 'img', 'role', 'telefonoOficina', 'telefonoPersonal'])
      .populate('paquete', 'nombre');

    return res.status(200).json({ ok: true, msg: '', referencia });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'No se pudo encontrar referencia. Inténtelo nuevamente' });
  }
};

export const obtenerReferencias = async (req: Request, res: Response) => {
  const { desde = 0, limite = 15 } = req.query;
  try {
    const [total, referencias] = await Promise.all([
      Referencias.countDocuments(),
      Referencias.find()
        .populate('paquete', 'nombre')
        .populate('usuario', ['nombre', 'apellido', 'correo', 'img', 'role', 'telefonoOficina', 'telefonoPersonal'])
        .skip(Number(desde))
        .limit(Number(limite))
        .sort('-createdAt'),
    ]);

    res.status(200).json({ ok: true, msg: 'Lista de referencias', referencias, total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'No se pudo obtener la lista de referencias. Inténtelo más tarde' });
  }
};

export const actualizarReferencia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { usuario, paquete, referencia, precio, importe, totalUsuarios, ...resto } = req.body;

  try {
    const referencia = await Referencias.findByIdAndUpdate(id, resto, { new: true });
    res.status(200).json({ ok: true, msg: 'Se ha actualizado la referencia', referencia });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: 'Error al momento de actualizar la referencia. Inténtelo más tarde' });
  }
};
