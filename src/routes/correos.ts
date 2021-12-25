import { Router } from 'express';
import { check } from 'express-validator';
import { contacto } from '../emails/contacto';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.post(
  '/contacto',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check(
      'telefono',
      'El número de teléfono debe de tener al menos 10 dígitos'
    ).isLength({ min: 10 }),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check(
      'mensaje',
      'El mensaje debe de tener al menos 30 caracteres'
    ).isLength({ min: 30 }),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    validarCampos,
  ],
  contacto
);

export default router;
