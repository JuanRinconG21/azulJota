const { Sequelize } = require("sequelize");

// Importar modelos
const User = require("./Usuario");
const Vent = require("./Venta");
const Empresas = require("./Empresas");
const Periodos = require("./Periodo");

// Configuración de la base de datos
const dbConfig = {
  database: "postgres",
  username: "postgres",
  password: "azulSoluciones",
  host: "5.189.133.32",
  dialect: "postgres",
};

// Crear instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const Usuario = User(sequelize, Sequelize);
const Venta = Vent(sequelize, Sequelize);
const Empresa = Empresas(sequelize, Sequelize);
const Periodo = Periodos(sequelize, Sequelize);

Empresa.hasMany(Periodo, { foreignKey: "EMPRESA_ID" });
// Función que sincroniza la base de datos con los modelos instanciados
sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos sincronizada");
});

module.exports = {
  Usuario,
  sequelize,
  Venta,
  Empresa,
  Periodo,
};
