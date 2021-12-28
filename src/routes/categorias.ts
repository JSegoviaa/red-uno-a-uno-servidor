import { Router } from 'express';
import { check } from 'express-validator';
import {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../controllers/categorias';
import { existeCategoriaPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';
import { esAdminRol } from '../middlewares/validarRoles';

const router = Router();

router.get('/', obtenerCategorias);

router.get(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    esAdminRol,
  ],
  crearCategoria
);

router.put(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  eliminarCategoria
);

export default router;
