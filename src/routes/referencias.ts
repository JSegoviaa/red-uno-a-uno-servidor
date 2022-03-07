import { Router } from 'express';
import { check } from 'express-validator';
import { crearReferencias, obtenerReferenciasUsuario } from '../controllers';
import { validarCampos, validarJWT } from '../middlewares';

const router = Router();

router.get('/:id', obtenerReferenciasUsuario);

router.post(
  '/',
  // [validarJWT, validarCampos],
  crearReferencias
);

export default router;
