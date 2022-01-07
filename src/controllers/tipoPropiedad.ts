import { Request, Response } from "express";

export const obtenerTiposDePropiedad = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "Tipos de propiedad" });
};

export const obtenerTipoDePropiedad = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "Tipo de propiedad" });
};

export const crearTipoDePropiedad = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "Crear tipo de propiedad" });
};

export const actualizarTipodePropiedad = async (
  req: Request,
  res: Response
) => {
  res.json({ ok: true, msg: "Actualizar tipo de propiedad" });
};

export const eliminarTipoDePropiedad = async (req: Request, res: Response) => {
  res.json({ ok: true, msg: "Eliminar tipo de propiedad" });
};
