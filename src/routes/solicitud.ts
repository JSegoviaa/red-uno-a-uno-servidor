import { Router } from 'express';
import { check } from 'express-validator';
import { aceptarSolicitud, obtenerSolicitudesUsuario, rechazarSolicitud, solicitarInmueble } from '../controllers';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.get(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'El propietario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  obtenerSolicitudesUsuario
);
router.post('/', solicitarInmueble);
router.put('/aceptar/:id', aceptarSolicitud);
router.put('/rechazar/:id', rechazarSolicitud);

export default router;
