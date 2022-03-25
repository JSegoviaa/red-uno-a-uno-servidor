import { Request, Router } from 'express';
import { check } from 'express-validator';
import { v2 } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {
  actualizarInmueble,
  crearInmuebles,
  eliminarInmueble,
  obtenerInmueblePorCategoria,
  obtenerInmueblePorCoordenadas,
  obtenerInmueblePorDir,
  obtenerInmueblePorId,
  obtenerInmueblePorTipo,
  obtenerInmueblePorURL,
  obtenerInmuebles,
  obtenerInmueblesLista,
  obtenerInmueblesListaCoords,
  obtenerInmueblesPorFecha,
  obtenerInmueblesPorUsuario,
} from '../controllers';
import { existeCategoriaPorId, existeInmueblePorId, existeTipoDePropiedadPorId } from '../helpers/dbValidators';
import { validarJWT, validarCampos } from '../middlewares';

const router = Router();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file) => {
    return {
      folder: `red1a1/usuarios/inmuebles`,
    };
  },
});

const upload = multer({ storage });

router.get('/', obtenerInmuebles);

router.get('/usuario/:id', obtenerInmueblesPorUsuario);

router.get('/url/:id', obtenerInmueblePorURL);

router.get('/direccion', obtenerInmueblePorDir);

router.get('/lista-inmuebles', obtenerInmueblesLista);

router.get(
  '/:id',
  [check('id', 'No es un id válido').isMongoId(), check('id').custom(existeInmueblePorId), validarCampos],
  obtenerInmueblePorId
);

router.post(
  '/',
  [
    validarJWT,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('titulo', 'El título debe tener máximo 75 caracteres').isLength({
      max: 75,
    }),
    check('antiguedad', 'La antigüedad debe tener máximo 12 caracteres').isLength({
      max: 12,
    }),
    check('otros', 'Otros debe tener máximo 100 caracteres').isLength({
      max: 100,
    }),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser mayor a 0').isFloat({ min: 1 }),
    check('categoria', 'No es un id válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('lat', 'La latitud es obligatoria').not().isEmpty(),
    check('lat', 'La latitud es debe de estar entre el rango dado').isFloat({
      min: -90,
      max: 90,
    }),
    check('lng', 'La longitud es obligatoria').not().isEmpty(),
    check('lng', 'La longitud debe de estar entre el rango dado').isFloat({
      min: -180,
      max: 180,
    }),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('tipoPropiedad', 'No es un id válido').isMongoId(),
    check('tipoPropiedad').custom(existeTipoDePropiedadPorId),
    validarCampos,
  ],
  crearInmuebles
);

router.put('/:id', [validarJWT, check('id').custom(existeInmueblePorId), validarCampos], actualizarInmueble);

router.delete(
  '/:id',
  [validarJWT, check('id', 'No es un id válido').isMongoId(), check('id').custom(existeInmueblePorId), validarCampos],
  eliminarInmueble
);

router.get('/inmuebles/coordenadas', obtenerInmueblePorCoordenadas);

router.get('/lista-inmuebles/coordenadas', obtenerInmueblesListaCoords);

router.get('/inmuebles/tipo-propiedad', obtenerInmueblePorTipo);
router.get('/inmuebles/categoria', obtenerInmueblePorCategoria);
router.get('/inmuebles/fecha', obtenerInmueblesPorFecha);

export default router;
