import { Router } from 'express';
import { check } from 'express-validator';
import {
  subirImagen,
  actualizarImagenCloudinary,
} from '../controllers/subidas';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';
import { validarArchivo } from '../middlewares/validarArchivo';

const router = Router();

router.post('/', validarArchivo, subirImagen);

router.put(
  '/usuarios/:id',
  [
    validarJWT,
    validarArchivo,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
  ],
  actualizarImagenCloudinary
);

export default router;
