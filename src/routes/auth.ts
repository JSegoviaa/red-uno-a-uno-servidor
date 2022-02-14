import { Router } from 'express';
import { check } from 'express-validator';
import { googleLogin, login, renovarToken } from '../controllers/auth';
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

router.get('/renovarToken', validarJWT, renovarToken);

router.post('/google', check('id_token', 'El id_token es necesario').not().isEmpty(), googleLogin);

export default router;
