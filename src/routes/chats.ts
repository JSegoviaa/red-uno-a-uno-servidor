import { Router } from 'express';
import { crearChat, obtenerChatsPorUsuario } from '../controllers/chats';
const router = Router();

router.post('/', crearChat);

router.get('/:uid', obtenerChatsPorUsuario);

export default router;
