import { Request, Response } from "express";
import { TipoPropiedad } from "../models/tipoPropiedad";

export const obtenerTiposDePropiedad = async (req: Request, res: Response) => {
  const { limite = 20, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, tipoPropiedad] = await Promise.all([
    TipoPropiedad.countDocuments(query),
    TipoPropiedad.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ ok: true, total, tipoPropiedad });
};

export const obtenerTipoDePropiedad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tipoPropiedad = await TipoPropiedad.findById(id);

  res.json({ ok: true, tipoPropiedad });
};

export const crearTipoDePropiedad = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  const tipoPropiedadDB = await TipoPropiedad.findOne({ nombre });

  if (tipoPropiedadDB) {
    return res.status(400).json({
      ok: false,
      msg: `Ese tipo de propiedad ${tipoPropiedadDB} ya ha sido creado`,
    });
  }

  const tipoPropiedad = new TipoPropiedad({ nombre });

  await tipoPropiedad.save();

  res.status(201).json({
    ok: true,
    msg: "Tipo de propiedad creado con éxito",
    tipoPropiedad,
  });
};

export const actualizarTipodePropiedad = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;

  const tipoPropiedad = await TipoPropiedad.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json({
    ok: true,
    msg: "El tipo de propiedad se ha creado con éxito",
    tipoPropiedad,
  });
};

export const eliminarTipoDePropiedad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const tipoPropiedad = await TipoPropiedad.findByIdAndDelete(id, {
    new: true,
  });

  res.json({
    ok: true,
    msg: "El tipo de propiedad se ha eliminado con éxito",
    tipoPropiedad,
  });
};
