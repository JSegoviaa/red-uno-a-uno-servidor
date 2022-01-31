import { Router } from 'express';
import { crearMensaje, obtenerMensajes } from '../controllers/mensajes';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post('/', crearMensaje);

router.get('/:id', validarJWT, obtenerMensajes);

export default router;
