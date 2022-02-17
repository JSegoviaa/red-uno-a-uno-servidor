import { Router } from 'express';
import { check } from 'express-validator';
import { contacto } from '../emails/contacto';
import { nuevoPedido, nuevoPedidoAdmin } from '../emails/pedido';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.post(
  '/contacto',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('telefono', 'El número de teléfono debe de tener al menos 10 dígitos').isLength({ min: 10 }),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje debe de tener al menos 30 caracteres').isLength({ min: 30 }),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    validarCampos,
  ],
  contacto
);

router.post(
  '/nuevo-pedido',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    check('nombrePaquete', 'El nombre del paquete es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('importe', 'El precio es obligatorio').not().isEmpty(),
    check('idCompra', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  nuevoPedido
);

router.post(
  '/nuevo-pedido-admin',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('nombrePaquete', 'El nombre del paquete es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('importe', 'El precio es obligatorio').not().isEmpty(),
    check('idCompra', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  nuevoPedidoAdmin
);

export default router;
