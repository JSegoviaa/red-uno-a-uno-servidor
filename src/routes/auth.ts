import { Router } from 'express';
import { check } from 'express-validator';
import { login, renovarToken } from '../controllers/auth';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

router.get('/renew', validarJWT, renovarToken);

export default router;
