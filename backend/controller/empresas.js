const { Empresa, sequelize } = require("../model/Conexion");
const { QueryTypes } = require("sequelize");

const ListarEmpresas = async (req, res) => {
  try {
    const Empresa = await sequelize.query(
      `SELECT "EMPRESA_ID", "EMP_RAZON_SOCIAL", "EMP_TERCERO"
            FROM public."EMPRESA"`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: Empresa });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

module.exports = {
  ListarEmpresas,
};
