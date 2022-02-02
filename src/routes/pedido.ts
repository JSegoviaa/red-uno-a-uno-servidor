import { Router } from 'express';
import { check } from 'express-validator';
import { crearPedido, obtenerPedido, obtenerPedidoPorUsuario, obtenerPedidos } from '../controllers/pedido';

const router = Router();

router.get('/', obtenerPedidos);
router.get('/:id', obtenerPedido);
router.get('/usuarios/:id', obtenerPedidoPorUsuario);
router.post('/', crearPedido);

export default router;
