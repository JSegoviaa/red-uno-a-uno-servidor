import { Router } from 'express';
import { check } from 'express-validator';
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
  [
    validarJWT,
    esAdminRol,
    check('nombre', 'El nombre del paquete es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción del paquete es obligatoria').not().isEmpty(),
    check('precioAnual', 'El precio anual es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearPaquete
);

router.put('/:id', [validarJWT, esAdminRol, validarCampos, esAdminRol], actualizarPaquete);

router.delete('/:id', [validarJWT, esAdminRol, validarCampos], eliminarPaquete);

export default router;
