import { Request, Response } from "express";
import { Historial } from "../models/historial";

export const obtenerHistorialPorUsuario = async (
  req: Request,
  res: Response
) => {
  res.json({ ok: true, msg: "Historial por usuarios" });
};

export const agregarHistorial = async (req: Request, res: Response) => {
  const { usuario, inmueble } = req.body;

  const historial = new Historial({ usuario, inmueble });

  await historial.save();

  res.json({ ok: true, msg: "", historial });
};

export const eliminarHistorial = async (req: Request, res: Response) => {
  const { id } = req.params;

  const historial = await Historial.findByIdAndDelete(id, { new: true });

  res.json({
    ok: true,
    msg: "Se ha eliminado de tu historial",
    historial,
  });
};
