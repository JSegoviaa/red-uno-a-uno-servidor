import { Request, Router } from 'express';
import { check } from 'express-validator';
import { v2 } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {
  actualizarImgs,
  eliminarImgs,
  imagenesInmueble,
  subirFotoPerfil,
  subirVideo,
  subirComprobante,
} from '../controllers/subidas';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';
import { existeInmueblePorId, existeUsuarioPorId } from '../helpers/dbValidators';

const router = Router();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storagePerfil = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file) => {
    return {
      folder: `red1a1/usuarios/${req.params.id}`,
      public_id: 'foto-de-perfil',
    };
  },
});

const uploadPerfil = multer({ storage: storagePerfil });

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file: Express.Multer.File) => {
    const { pid, uid } = req.params;

    return {
      folder: `red1a1/usuarios/${uid}/inmuebles/${pid}`,
    };
  },
});

const upload = multer({ storage }).array('pictures', 20);

const storageVideo = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file: Express.Multer.File) => {
    const { pid, uid } = req.params;

    return {
      folder: `red1a1/usuarios/${uid}/inmuebles/${pid}`,
      public_id: 'video',
    };
  },
});

const video = multer({ storage: storageVideo }).single('video');

const storageComprobante = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file) => {
    return {
      folder: `red1a1/usuarios/${req.params.uid}/comprobante/${req.params.rid}`,
      public_id: 'comprobante-de-pago',
    };
  },
});

const uploadComprobante = multer({ storage: storageComprobante });

router.post(
  '/usuarios/:id',
  [validarJWT, check('id', 'No es un id válido').isMongoId(), uploadPerfil.single('picture'), validarCampos],
  subirFotoPerfil
);

router.post(
  '/comprobante/:uid/:rid',
  [validarJWT, uploadComprobante.single('comprobante'), validarCampos],
  subirComprobante
);

router.post(
  '/:uid/:pid',
  [
    validarJWT,
    check('uid', 'No es un id válido').isMongoId(),
    check('uid').custom(existeUsuarioPorId),
    check('pid', 'No es un id válido').isMongoId(),
    check('pid').custom(existeInmueblePorId),
    upload,
    validarCampos,
  ],
  imagenesInmueble
);

router.post(
  '/actualizar/:uid/:pid',
  [
    validarJWT,
    check('uid', 'No es un id válido').isMongoId(),
    check('uid').custom(existeUsuarioPorId),
    check('pid', 'No es un id válido').isMongoId(),
    check('pid').custom(existeInmueblePorId),
    upload,
    validarCampos,
  ],
  actualizarImgs
);

router.post('/video/:uid/:pid', video, subirVideo);

router.put(
  '/imagenes/:uid/:pid',
  [
    validarJWT,
    check('uid', 'No es un id válido').isMongoId(),
    check('uid').custom(existeUsuarioPorId),
    check('pid', 'No es un id válido').isMongoId(),
    check('pid').custom(existeInmueblePorId),
    validarCampos,
  ],
  eliminarImgs
);

export default router;
