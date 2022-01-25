import { Router } from "express";
import { check } from "express-validator";
import {
  agregarFavoritos,
  eliminarFavoritos,
  obtenerFavoritosPorUsuario,
  obtenerFavoritosPorUsuarioSolicitud,
} from "../controllers/favoritos";
import { existeFavPorId } from "../helpers/dbValidators";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get("/usuario/:id", obtenerFavoritosPorUsuario);

router.get("/usuario-solicitud/:id", obtenerFavoritosPorUsuarioSolicitud);

router.post(
  "/",
  [
    validarJWT,
    check("usuario", "No es un id válido").isMongoId(),
    check("usuario", "El usuario es requerido").not().isEmpty(),
    check("inmueble", "No es un id válido").isMongoId(),
    check("inmueble", "El inmueble es requerido").not().isEmpty(),
    validarCampos,
  ],
  agregarFavoritos
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeFavPorId),
    validarCampos,
  ],
  eliminarFavoritos
);

export default router;
