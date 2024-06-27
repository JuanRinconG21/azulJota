const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
    return sequelize.define(
      "PERIODO",
      {
        ID_PERIODO: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NOM_PERIODO : {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        FECHA_INI: {
          type: DataTypes.TIME,
          allowNull: true,
        },
        FECHA_FIN: {
          type: DataTypes.TIME,
          allowNull: true,
        },
        EMPRESA_ID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references:{
            model: "EMPRESA",
            key: "EMPRESA_ID"
          }
        }
      },
      {
        timestamps: false,
        tableName: "PERIODO",
      }
    );
  };