import { Router } from 'express';
import { check } from 'express-validator';
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check(
      'password',
      'La contraseña debe de tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
    check('role', 'No es un rol permitido').isIn(['Administrador', 'Usuario']),
    validarCampos,
  ],
  crearUsuario
);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
