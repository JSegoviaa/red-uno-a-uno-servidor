import { Router } from 'express';
import { check } from 'express-validator';
import {
  actualizarInmueble,
  crearInmuebles,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
} from '../controllers/inmuebles';
import {
  existeCategoriaPorId,
  existeInmueblePorId,
} from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/', obtenerInmuebles);
router.get(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeInmueblePorId),
    validarCampos,
  ],
  obtenerInmueblePorId
);

router.post(
  '/',
  [
    validarJWT,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearInmuebles
);

router.put(
  '/:id',
  [validarJWT, check('id').custom(existeInmueblePorId), validarCampos],
  actualizarInmueble
);

router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeInmueblePorId),
    validarCampos,
  ],
  eliminarInmueble
);

export default router;
