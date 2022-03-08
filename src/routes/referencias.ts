import { Router } from 'express';
import { check } from 'express-validator';
import { crearReferencias, obtenerReferenciasUsuario } from '../controllers';
import { existeUsuarioPorId } from '../helpers/dbValidators';
import { validarCampos, validarJWT } from '../middlewares';

const router = Router();

router.get('/:id', obtenerReferenciasUsuario);

router.post(
  '/',
  [
    validarJWT,
    check('usuario', 'No es un id válido').isMongoId(),
    check('usuario').custom(existeUsuarioPorId),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('paquete', 'No es un id válido').isMongoId(),
    check('paquete', 'No es un id válido').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('importe', 'El importe es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearReferencias
);

router.put('/:id');

export default router;
