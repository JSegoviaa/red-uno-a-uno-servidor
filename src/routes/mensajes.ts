import { Router } from 'express';
import { crearMensaje, obtenerMensajes } from '../controllers/mensajes';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post('/', crearMensaje);

router.get('/:id', obtenerMensajes);

export default router;
