import { Router } from 'express';
import {
  aceptarCompartir,
  compartirInmueble,
  obtenerInmueblesCompartidos,
  obtenerMisInmueblesCompartidos,
  rechazarCompartir,
} from '../controllers';

const router = Router();

router.get('/', obtenerInmueblesCompartidos);
router.get('/mis-compartidos', obtenerMisInmueblesCompartidos);
router.post('/', compartirInmueble);
router.put('/aceptar/:id', aceptarCompartir);
router.put('/rechazar/:id', rechazarCompartir);

export default router;
