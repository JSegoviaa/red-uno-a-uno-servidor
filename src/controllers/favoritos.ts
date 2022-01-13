import { Request, Response } from "express";
import { Favorito } from "../models/favoritos";

export const obtenerFavoritosPorUsuario = async (
  req: Request,
  res: Response
) => {
  const { limite = 20, desde = 0 } = req.query;
  const { id } = req.params;

  const favoritosUsuario = await Favorito.find({ usuario: id })
    .skip(Number(desde))
    .limit(Number(limite));

  res.json({
    ok: true,
    favoritosUsuario,
  });
};

export const agregarFavoritos = async (req: Request, res: Response) => {
  const { usuario, inmueble } = req.body;

  const favoritos = new Favorito({ usuario, inmueble });

  const existeFavorito = await Favorito.findOne({ inmueble });

  if (existeFavorito) {
    return res.status(400).json({
      ok: false,
      msg: `El inmueble con id ${inmueble} ya ha sido agregado a favoritos`,
    });
  }

  await favoritos.save();

  res.json({ ok: true, favoritos });
};

export const eliminarFavoritos = async (req: Request, res: Response) => {
  const { id } = req.params;

  const favorito = await Favorito.findByIdAndDelete(id, { new: true });

  res.json({
    ok: true,
    msg: "Se ha eliminado de tus favoritos",
    favorito,
  });
};
