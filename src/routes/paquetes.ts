import { Router } from 'express';
import {
  actualizarPaquete,
  crearPaquete,
  eliminarPaquete,
  obtenerPaquete,
  obtenerPaquetes,
} from '../controllers/paquete';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';
import { esAdminRol } from '../middlewares/validarRoles';

const router = Router();

router.get('/', [], obtenerPaquetes);

router.get('/:id', [], obtenerPaquete);

router.post(
  '/',
  // [validarJWT, validarCampos, esAdminRol],
  crearPaquete
);

router.put(
  '/:id',
  // [validarJWT, validarCampos, esAdminRol],
  actualizarPaquete
);

router.delete(
  '/:id',
  // [validarJWT, validarCampos, esAdminRol],
  eliminarPaquete
);

export default router;
