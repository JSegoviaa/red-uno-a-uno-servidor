import { Router } from 'express';
import {
  actualizarInmueble,
  crearInmuebles,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
} from '../controllers/inmuebles';

const router = Router();

router.get('/', obtenerInmuebles);
router.get('/:id', obtenerInmueblePorId);
router.post('/', crearInmuebles);
router.put('/:id', actualizarInmueble);
router.delete('/:id', eliminarInmueble);

export default router;
