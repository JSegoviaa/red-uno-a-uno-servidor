import { Request, Router } from "express";
import { check } from "express-validator";
import { v2 } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { subirFotoPerfil, subirLogo } from "../controllers/subidas";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

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
      public_id: "foto-de-perfil",
    };
  },
});

const uploadPerfil = multer({ storage: storagePerfil });

const storageLogo = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file) => {
    return {
      folder: `red1a1/usuarios/${req.params.id}`,
      public_id: "logo",
    };
  },
});

const uploadLogo = multer({ storage: storageLogo });

router.post(
  "/usuarios/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    uploadPerfil.single("picture"),
    validarCampos,
  ],
  subirFotoPerfil
);

router.post(
  "/usuarios-logo/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    uploadLogo.single("picture"),
    validarCampos,
  ],
  subirLogo
);

export default router;
