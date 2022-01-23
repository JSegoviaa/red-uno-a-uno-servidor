import { Router } from 'express';
import { obtenerMensajes } from '../controllers/mensajes';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/:de', validarJWT, obtenerMensajes);

export default router;
