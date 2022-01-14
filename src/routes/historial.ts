import { Router } from "express";
import { check } from "express-validator";
import {
  agregarHistorial,
  eliminarHistorial,
  obtenerHistorialPorUsuario,
} from "../controllers/historial";
import { existeHistPorId } from "../helpers/dbValidators";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get("/usuario/:id", obtenerHistorialPorUsuario);

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
  agregarHistorial
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeHistPorId),
    validarCampos,
  ],
  eliminarHistorial
);

export default router;
