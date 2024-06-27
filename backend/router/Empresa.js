const express = require("express");
const router = express.Router();
const EmpresaController = require("../controller/empresas");
const auth = require("../controller/Auth");

router.get("/empresas/listar", EmpresaController.ListarEmpresas);

module.exports = router;
