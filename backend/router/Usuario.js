const express = require("express");
const router = express.Router();
const UserController = require("../controller/usuario");
const auth = require("../controller/Auth");
const multer = require("multer");
const { Usuario } = require("../model/Conexion");
const bcrypt = require("bcrypt");

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
          let password = await bcrypt.hash(datos.USU_PASS, 10);
          console.table(req.body);
          console.log("REQ FILE 2", req.file);
          const originalname = req.file.filename;
          const imagePath = `http://localhost:3600/${originalname}`;
          const usuarioData = {
            ...req.body,
            USU_PASS: password,
            USU_IMAGEN: imagePath,
          };
          const nuevoUsuario = await Usuario.create(usuarioData);
          res.send({
            id: 200,
            mensaje: "Usuario agregado exitosamente",
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

module.exports = router;