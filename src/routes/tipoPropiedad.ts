import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarTipodePropiedad,
  crearTipoDePropiedad,
  eliminarTipoDePropiedad,
  obtenerTipoDePropiedad,
  obtenerTiposDePropiedad,
} from "../controllers/tipoPropiedad";

const router = Router();

router.get("/", obtenerTiposDePropiedad);
router.get("/:id", obtenerTipoDePropiedad);
router.post("/", crearTipoDePropiedad);
router.put("/:id", actualizarTipodePropiedad);
router.delete("/:id", eliminarTipoDePropiedad);

export default router;
