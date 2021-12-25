import { Router } from 'express';
import { check } from 'express-validator';
import { contacto } from '../controllers/correos';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.post(
  '/contacto',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    validarCampos,
  ],
  contacto
);

export default router;
