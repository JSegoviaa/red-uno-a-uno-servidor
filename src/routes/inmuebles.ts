import { Router } from 'express';
import { check } from 'express-validator';
import {
  actualizarInmueble,
  crearInmuebles,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
} from '../controllers/inmuebles';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/', obtenerInmuebles);
router.get('/:id', obtenerInmueblePorId);
router.post(
  '/',
  [
    validarJWT,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearInmuebles
);
router.put('/:id', actualizarInmueble);
router.delete('/:id', eliminarInmueble);

export default router;
