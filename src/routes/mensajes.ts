import { Router } from 'express';
import { crearMensaje, obtenerMensajes } from '../controllers/mensajes';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post('/', [validarJWT, validarCampos], crearMensaje);

router.get('/:id', [validarJWT, validarCampos], obtenerMensajes);

export default router;
