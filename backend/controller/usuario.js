const { Usuario, sequelize } = require("../model/Conexion");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//ENCRIPTAR Y DESENCRIPTAR CONTRA
const crypto = require("crypto");
//LLAVE PARA DESENCRIPTAR
let llave = "1a3ba3357ddddd0dab0e79875da565c66514d9c5ef5a8416c8e9712bc6b714f6";
//FUNCION DESENCRIPTAR
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
/* const AgregarUsuario = async (req, res) => {
  try {
    let datos = req.body;
    let consulta = await Usuario.findOne({
      where: { USU_EMAIL: req.body.USU_EMAIL },
    });
    if (consulta == null) {
      let password = await bcrypt.hash(datos.USU_PASS, 10);
      const Metodos = await Usuario.create({
        ...req.body,
        USU_PASS: password,
      });
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
};
 */
const EditarUsuario = async (req, res) => {
  try {
    let datos = req.body;
    let password = await bcrypt.hash(datos.USU_PASS, 10);
    const Users = await Usuario.update(
      { ...req.body, USU_PASS: password },
      {
        where: { USUARIO_ID: req.params.id },
      }
    );
    res.send({ id: 200, mensaje: "Usuario editado exitosamente" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.messages });
  }
};

/* 
const EditarEstadoUsuario = async (req, res) => {
  try {
    // Verificar si el nuevo estado es válido
    const nuevoEstado = req.body.idEstado; // Suponiendo que el nuevo estado se pasa en el cuerpo de la solicitud
    if (nuevoEstado !== 0 && nuevoEstado !== 1) {
      return res.status(400).send({ mensaje: "El estado proporcionado no es válido." });
    }
    
    // Actualizar el estado del usuario
    await Usuario.update(
      { idEstado: nuevoEstado },
      { where: { USUARIO_ID: req.params.id } }
    );

    // Si el usuario está cambiando a estado inactivo (0), desloguearlo si está logueado
    if (nuevoEstado === 0) {
      // Lógica para limpiar el token de acceso (JWT)
      const token = req.headers.authorization.split(' ')[1]; // Suponiendo que el token JWT está en el encabezado Authorization
      jwt.verify(token, 'secreto_del_token', (err, decoded) => {
        if (err) {
          return res.status(401).send({ mensaje: "Token inválido." });
        } else {
          // Aquí puedes agregar la lógica para invalidar el token, por ejemplo, marcándolo como expirado en la base de datos o revocándolo de alguna manera
          // Por ejemplo, si tienes una lista de tokens revocados en tu base de datos, podrías agregar este token a esa lista
          // Puedes también hacer que el token expire inmediatamente, por ejemplo, estableciendo su fecha de expiración en el pasado
          // Después de invalidar el token, puedes enviar una respuesta al cliente indicando que el token ha sido invalidado
          res.status(200).send({ mensaje: "Token invalidado correctamente." });
        }
      });
    } else {
      res.status(200).send({ mensaje: "Estado editado correctamente." });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error al editar el estado del usuario: " + error.message });
  }
}; */

const EliminarUsuario = async (req, res) => {
  try {
    const Users = await Usuario.destroy({
      where: { USUARIO_ID: req.params.id },
    });
    res.send({ id: 200, mensaje: "El usuario ha sido eliminado" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.messages });
  }
};

const ListarTodosUsuarios = async (req, res) => {
  try {
    const Users = await sequelize.query(
      `SELECT u."USUARIO_ID", u."EMPRESA_ID", u."USU_USUARIO", u."USU_NOMBRE", u."USU_APELLIDO", u."USU_TELEFONO", u."USU_EMAIL", u."USU_PASS", u."USU_ROL", u."USU_ESTADO", u."USU_IMAGEN", u."USU_CODIGO", e."EMP_TERCERO"
      FROM public."USUARIO" u
      INNER JOIN public."EMPRESA" e ON u."EMPRESA_ID" = e."EMPRESA_ID"`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: Users });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const ListarUnUsuario = async (req, res) => {
  try {
    const Users = await sequelize.query(
      `SELECT "USUARIO_ID", "EMPRESA_ID", "USU_USUARIO", "USU_NOMBRE", "USU_APELLIDO", "USU_TELEFONO", "USU_EMAIL", "USU_PASS","USU_ROL", "USU_ESTADO","USU_IMAGEN",   "USU_CODIGO"
      FROM public."USUARIO" WHERE "USUARIO_ID" =${req.params.id};`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: Users });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const ListarXCorreo = async (req, res) => {
  try {
    const Correo = await sequelize.query(
      `SELECT "USUARIO_ID", "EMPRESA_ID", "USU_USUARIO", "USU_NOMBRE", "USU_APELLIDO", "USU_TELEFONO", "USU_EMAIL", "USU_PASS","USU_ROL", "USU_ESTADO","USU_IMAGEN",  "USU_CODIGO"
    FROM public."USUARIO" WHERE "USU_EMAIL" = '${req.params.id}'`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: Correo });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const login = async (req, res) => {
  try {
    let data = req.body;

    if (!data.USU_EMAIL || !data.USU_PASS) {
      res.send({ id: 400, mensaje: "Correo / Contraseña incorrecta" });
    }
    console.log("data", data);
    let dataUsers = await sequelize.query(
      `SELECT * FROM "USUARIO" WHERE "USU_EMAIL" = '${data.USU_EMAIL}' AND "USU_ESTADO"= true`,
      { type: QueryTypes.SELECT }
    );

    console.log(dataUsers);
    if (dataUsers[0] == null) {
      res.send({ id: 400, mensaje: "Usuario no existe" });
    } else {
      let password = bcrypt.compareSync(data.USU_PASS, dataUsers[0].USU_PASS);
      if (!password) {
        res.send({ id: 400, mensaje: "Contraseña incorrecta" });
      } else {
        let dataEmpresa = await sequelize.query(
          `SELECT * FROM "EMPRESA" WHERE "EMPRESA_ID" = ${dataUsers[0].EMPRESA_ID}`,
          { type: QueryTypes.SELECT }
        );
        const token = jwt.sign(
          {
            USUARIO_ID: dataUsers[0].USUARIO_ID,
            USU_USUARIO: dataUsers[0].USU_USUARIO,
            USU_NOMBRE: dataUsers[0].USU_NOMBRE,
            USU_APELLIDO: dataUsers[0].USU_APELLIDO,
            EMPRESA_ID: dataUsers[0].EMPRESA_ID,
            USU_EMAIL: dataUsers[0].USU_EMAIL,
            EMP_TERCERO: dataEmpresa[0].EMP_TERCERO,
            EMP_RAZON_SOCIAL: dataEmpresa[0].EMP_RAZON_SOCIAL,
            USU_IMAGEN: dataUsers[0].USU_IMAGEN,
          },
          "Mafe&Angie",
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).send({
          id: 200,

          mensaje: {
            USUARIO_ID: dataUsers[0].USUARIO_ID,
            USU_USUARIO: dataUsers[0].USU_USUARIO,
            USU_NOMBRE: dataUsers[0].USU_NOMBRE,
            USU_APELLIDO: dataUsers[0].USU_APELLIDO,
            EMPRESA_ID: dataUsers[0].EMPRESA_ID,
            USU_EMAIL: dataUsers[0].USU_EMAIL,
            EMP_TERCERO: dataEmpresa[0].EMP_TERCERO,
            EMP_RAZON_SOCIAL: dataEmpresa[0].EMP_RAZON_SOCIAL,
            USU_ROL: dataUsers[0].USU_ROL,
            USU_IMAGEN: dataUsers[0].USU_IMAGEN,
          },
          token: token,
        });
      }
    }
  } catch (error) {
    res.send({ id: 400, mensaje: error.messages });
    console.log(error);
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mafevillada030417@gmail.com",
    pass: "ddha hrab yudb zhtd",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Función para generar un código aleatorio de 4 dígitos
function generarCodigo() {
  return Math.floor(1000 + Math.random() * 9000);
}

const enviarCorreo = async (req, res) => {
  // Capturar información del usuario
  try {
    // Paso 1: Obtener el correo del cuerpo de la solicitud (req.body)
    const { correo } = req.body;
    console.log(req.body);

    let consulta = await Usuario.findOne({
      where: { USU_EMAIL: correo },
    });
    if (consulta == null) {
      // Si el correo no existe, enviar un mensaje de error
      return res.send({
        id: 400,
        mensaje: "Error: El correo proporcionado no existe en la base de datos",
      });
    }

    // Paso 3: Generar un código de 4 dígitos
    const codigo = generarCodigo();

    // Paso 4: Actualizar el campo codigo del usuario en la base de datos con el código de verificación
    await Usuario.update(
      { USU_CODIGO: codigo },
      {
        where: { USU_EMAIL: correo },
      }
    );

    // Paso 4: Enviar el correo con el código
    const info = await transporter.sendMail({
      from: '"Azul Soluciones" <mafevillada030417@gmail.com>', // Quién envía el correo y un título
      to: correo, // Hacia quién va el correo (correo proporcionado en la solicitud)
      subject: "Código para cambio de contraseña", // Asunto del correo
      text: `Tu código de verificación es: ${codigo}`, // Cuerpo del correo con el código
    });

    // Paso 5: Enviar respuesta al cliente
    res.send({ id: 200, mensaje: "Correo enviado, copiar el código " });
    console.log("Message sent: %s", info.messageId);
    console.log(info);
    console.log(codigo);
  } catch (error) {
    res.send({ id: 400, mensaje: `Error: ${error.message} ` });
  }
};

const verificarCodigo = async (req, res) => {
  try {
    const { USU_EMAIL, USU_CODIGO } = req.body;

    if (!USU_EMAIL || !USU_CODIGO) {
      return res
        .status(400)
        .send({ id: 400, mensaje: "Correo / Código incorrecto" });
    }

    const dataUser = await sequelize.query(
      `SELECT * FROM "USUARIO" WHERE "USU_EMAIL" = '${USU_EMAIL}' AND "USU_CODIGO" = '${USU_CODIGO}'`,
      { type: QueryTypes.SELECT }
    );

    if (!dataUser || dataUser.length === 0) {
      return res.status(400).send({
        id: 400,
        mensaje: "Usuario no encontrado o código incorrecto",
      });
    }

    return res.status(200).send({
      id: 200,
      mensaje: {
        USU_EMAIL: dataUser[0].USU_EMAIL,
        USU_CODIGO: dataUser[0].USU_CODIGO,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ id: 500, mensaje: "Error interno del servidor" });
  }
};

const ActualizarPass = async (req, res) => {
  try {
    //Capturo los datos del BODY
    const { USU_EMAIL, USU_CODIGO, USU_PASS } = req.body;
    //Valido que no venga vacio
    if (!USU_EMAIL || !USU_CODIGO || !USU_PASS) {
      return res.status(400).send({ id: 400, mensaje: "Campos Vacios" });
    }
    try {
      //Encripto contraseña
      let password = await bcrypt.hash(USU_PASS, 10);
      //Actualizo la pass
      const Users = await Usuario.update(
        { USU_PASS: password, USU_CODIGO: null },
        {
          where: { USU_EMAIL: USU_EMAIL, USU_CODIGO: USU_CODIGO },
        }
      );
      res.send({ id: 200, mensaje: "Contraseña Actualizada Correctamente" });
    } catch (error) {
      //En caso de error
      return res.status(400).send({
        id: 400,
        mensaje: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ id: 500, mensaje: "Error interno del servidor" });
  }
};

const ActivarUsuario = async (req, res) => {
  try {
    const Activar = await sequelize.query(
      `UPDATE public."USUARIO" SET "USU_ESTADO"= true WHERE "USUARIO_ID"  = '${req.params.id}'`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: "Usuario Activado Correctamente" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};
const DesactivarUsuario = async (req, res) => {
  try {
    const Desactivar = await sequelize.query(
      `UPDATE public."USUARIO" SET "USU_ESTADO"= false WHERE "USUARIO_ID"  = '${req.params.id}'`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: "Usuario Desactivado Correctamente" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const DesencriptarContra = async (req, res) => {
  try {
    const Pass = await sequelize.query(
      `SELECT "USU_PASSDES"
      FROM public."USUARIO" WHERE "USUARIO_ID" =${req.params.id};`,
      { type: QueryTypes.SELECT }
    );
    let contraDesencriptada = decryptPassword(Pass[0].USU_PASSDES, llave);
    res.send({ id: 200, mensaje: contraDesencriptada });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};
module.exports = {
  EditarUsuario,
  EliminarUsuario,
  ListarTodosUsuarios,
  ListarUnUsuario,
  login,
  enviarCorreo,
  ListarXCorreo,
  verificarCodigo,
  ActualizarPass,
  ActivarUsuario,
  DesactivarUsuario,
  DesencriptarContra,
};
