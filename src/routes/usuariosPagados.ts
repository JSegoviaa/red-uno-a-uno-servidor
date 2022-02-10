import { Router } from 'express';
import { check } from 'express-validator';
import {
  actualizarUsuarioP,
  crearUsuarioP,
  eliminarUsuarioP,
  obtenerUsuarioP,
  obtenerUsuariosP,
} from '../controllers/usuariosPagados';

const router = Router();

router.get('/', obtenerUsuariosP);

router.get('/:id', obtenerUsuarioP);

router.post('/', crearUsuarioP);

router.put('/:id', actualizarUsuarioP);

router.delete('/:id', eliminarUsuarioP);

export default router;
