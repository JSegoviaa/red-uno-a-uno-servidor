import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from "../controllers/usuarios";
import {
  esRolValido,
  existeCorreo,
  existeUsuarioPorId,
} from "../helpers/dbValidators";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";
import { esAdminRol } from "../middlewares/validarRoles";

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuario);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("correo", "El correo electrónico ingresado no es correcto").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check(
      "password",
      "La contraseña debe de tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo").custom(existeCorreo),
    check("role").custom(esRolValido),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    // check('role').custom(esRolValido),
    // check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    check("nombre", "El nombre no puede quedar vacío").not().isEmpty(),
    check("apellido", "El apellido no puede quedar vacío").not().isEmpty(),
    check(
      "telefonoOficina",
      "El número telefónico debe tener 10 caracteres"
    ).isLength({ min: 10, max: 10 }),
    check(
      "telefonoPersonal",
      "El número telefónico debe tener 10 caracteres"
    ).isLength({ min: 10, max: 10 }),
    check("correo").custom(existeCorreo),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  eliminarUsuario
);

export default router;
