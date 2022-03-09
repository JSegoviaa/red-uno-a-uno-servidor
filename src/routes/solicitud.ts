import { Router } from 'express';
import { check } from 'express-validator';
import {
  aceptarSolicitud,
  obtenerSolicitudesPropietario,
  obtenerSolicitudesUsuario,
  rechazarSolicitud,
  solicitarInmueble,
} from '../controllers';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'El propietario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  obtenerSolicitudesPropietario
);

router.get(
  '/usuario/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'El propietario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  obtenerSolicitudesUsuario
);

router.post('/', [validarJWT, validarCampos], solicitarInmueble);

router.put(
  '/aceptar/:id',
  [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'El propietario es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  aceptarSolicitud
);

router.put(
  '/rechazar/:id',
  [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'El propietario es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  rechazarSolicitud
);

export default router;
