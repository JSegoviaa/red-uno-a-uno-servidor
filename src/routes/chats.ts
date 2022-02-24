import { Router } from 'express';
import { crearChat, obtenerChatsPorUsuario } from '../controllers/chats';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';
const router = Router();

router.post('/', [validarJWT, validarCampos], crearChat);

router.get('/:uid', obtenerChatsPorUsuario);

export default router;
