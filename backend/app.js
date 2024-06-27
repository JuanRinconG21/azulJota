const express = require("express");
const cors = require("cors");
const path = require("path");

const RutaUsuarios = require("./router/Usuario");
const RutaEmpresas = require("./router/Empresa");

const app = express();
require("./model/Conexion");
const puerto = 3600;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "upload")));

app.use("/", RutaUsuarios);
app.use("/", RutaEmpresas);

app.listen(puerto, () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3600");
});
