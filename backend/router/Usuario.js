const express = require("express");
const router = express.Router();
const UserController = require("../controller/usuario");
const auth = require("../controller/Auth");
const multer = require("multer");
const { Usuario } = require("../model/Conexion");
const bcrypt = require("bcrypt");
//ENCRIPTAR Y DESENCRIPTAR CONTRA
const crypto = require("crypto");
//LLAVE PARA DESENCRIPTAR
const llave =
  "1a3ba3357ddddd0dab0e79875da565c66514d9c5ef5a8416c8e9712bc6b714f6";
//FUNCION PARA ENCRIPTAR CONTRASEÑA
function encryptPassword(password, key) {
  const iv = crypto.randomBytes(16); // Generar un IV aleatorio
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}
function decryptPassword(encryptedPassword, key) {
  const parts = encryptedPassword.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = Buffer.from(parts[1], "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
//FUNCION PARA DESENCRIPTAR CONTRASEÑA

//Agrega el usuario con la imagen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    let imagePath = Date.now() + "-" + file.originalname;
    cb(null, imagePath);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Tamaño máximo: 50 MB
  },
});

router.post(
  "/usuarios/agregar",
  upload.single("USU_IMAGEN"),

  async (req, res) => {
    try {
      let datos = req.body;
      let consulta = await Usuario.findOne({
        where: { USU_EMAIL: req.body.USU_EMAIL },
      });
      if (consulta == null) {
        let contra2 = encryptPassword(datos.USU_PASS, llave);
        let password = await bcrypt.hash(datos.USU_PASS, 10);
        console.table(req.body);
        console.log("REQ FILE 2", req.file);
        const originalname = req.file.filename;
        const imagePath = `http://localhost:3600/${originalname}`;
        const usuarioData = {
          ...req.body,
          USU_PASS: password,
          USU_IMAGEN: imagePath,
          USU_PASSDES: contra2,
        };
        const nuevoUsuario = await Usuario.create(usuarioData);
        const contraDes = decryptPassword(contra2, llave);
        res.send({
          id: 200,
          mensaje: "Usuario agregado exitosamente",
          contras: contraDes,
        });
      } else {
        res.send({ id: 400, mensaje: "Usuario ya existe" });
      }
    } catch (error) {
      res.send({ id: 400, mensaje: error.message });
    }
  }
);

router.post("/usuarios/login", UserController.login);

router.post("/usuarios/verificarCodigo", UserController.verificarCodigo);

router.post("/usuarios/enviarCorreo", UserController.enviarCorreo);
//Ruta para actualizar contraseña
router.put("/usuarios/actualizarPass", UserController.ActualizarPass);

router.put("/usuarios/editar/:id", auth, UserController.EditarUsuario);

router.delete("/usuarios/eliminar/:id", auth, UserController.EliminarUsuario);

router.get("/usuarios/listar", UserController.ListarTodosUsuarios);

router.get("/usuarios/listarUno/:id", auth, UserController.ListarUnUsuario);

router.get("/usuarios/listarXCorreo/:id", UserController.ListarXCorreo);
//Activar Usuario
router.put("/usuarios/activarUser/:id", UserController.ActivarUsuario);
//Desactivar Usuario
router.put("/usuarios/desactivarUser/:id", UserController.DesactivarUsuario);

router.get("/usuarios/desencriptarPass/:id", UserController.DesencriptarContra);

module.exports = router;
