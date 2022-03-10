import { Router } from 'express';
import { check } from 'express-validator';
import {
  crearPedido,
  obtenerPedido,
  obtenerPedidoPorUsuario,
  obtenerPedidos,
  crearPedidoRef,
} from '../controllers/pedido';
import { existeUsuarioPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/', obtenerPedidos);
router.get('/:id', obtenerPedido);
router.get('/usuarios/:id', obtenerPedidoPorUsuario);
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
    check('fechaPago', 'La fecha de pago es obligatoria').not().isEmpty(),
    check('fechaVencimiento', 'La fecha de vencimiento es obligatoria').not().isEmpty(),
    check('metodoPago', 'El método de pago es obligatorio').not().isEmpty(),
    check('idPago', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearPedido
);

router.post(
  '/ref',
  [
    check('usuario', 'No es un id válido').isMongoId(),
    check('usuario').custom(existeUsuarioPorId),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('paquete', 'No es un id válido').isMongoId(),
    check('paquete', 'No es un id válido').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('importe', 'El importe es obligatorio').not().isEmpty(),
    check('fechaPago', 'La fecha de pago es obligatoria').not().isEmpty(),
    check('fechaVencimiento', 'La fecha de vencimiento es obligatoria').not().isEmpty(),
    check('metodoPago', 'El método de pago es obligatorio').not().isEmpty(),
    check('idPago', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearPedidoRef
);

export default router;
