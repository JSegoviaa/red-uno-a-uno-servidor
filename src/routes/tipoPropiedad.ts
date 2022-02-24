import { Router } from 'express';
import { check } from 'express-validator';
import {
  actualizarTipodePropiedad,
  crearTipoDePropiedad,
  eliminarTipoDePropiedad,
  obtenerTipoDePropiedad,
  obtenerTiposDePropiedad,
} from '../controllers/tipoPropiedad';
import { existeTipoDePropiedadPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';
import { esAdminRol } from '../middlewares/validarRoles';

const router = Router();

router.get('/', obtenerTiposDePropiedad);

router.get(
  '/:id',
  [check('id', 'No es un id válido').isMongoId(), check('id').custom(existeTipoDePropiedadPorId), validarCampos],
  obtenerTipoDePropiedad
);

router.post(
  '/',
  [validarJWT, esAdminRol, check('nombre', 'El nombre es obligatorio').not().isEmpty()],
  crearTipoDePropiedad
);

router.put(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeTipoDePropiedadPorId),
    validarCampos,
  ],
  actualizarTipodePropiedad
);

router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeTipoDePropiedadPorId),
    validarCampos,
  ],
  eliminarTipoDePropiedad
);

export default router;
