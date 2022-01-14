import { Router } from "express";
import { actualizarImagenUsuario } from "../controllers/subidas";

const router = Router();

router.post("/", actualizarImagenUsuario);

export default router;
