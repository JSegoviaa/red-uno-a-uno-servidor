import { Router } from 'express';
import { crearChat, obtenerChatsPorUsuario } from '../controllers/chats';
import { validarJWT } from '../middlewares/validarJWT';
const router = Router();

router.post('/', validarJWT, crearChat);

router.get('/:uid', obtenerChatsPorUsuario);

export default router;
