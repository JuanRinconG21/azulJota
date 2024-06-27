const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
    return sequelize.define(
      "EMPRESA",
      {
        EMPRESA_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        EMP_RAZON_SOCIAL: {
          type: DataTypes.STRING(250),
          allowNull: true,
        },
        EMP_TERCERO: {
          type: DataTypes.STRING(250),
          allowNull: true,
        },
        EMP_DIRECCION: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        EMP_BARRIO: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        EMP_CIUDAD: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        EMP_TELEFONO: {
          type: DataTypes.STRING(15),
          allowNull: true,
        },
        EMP_EMAIL:{
            type: DataTypes.STRING(80),
            allowNull: true,
        }
      },
      {
        timestamps: false,
        tableName: "EMPRESA",
      }
    );
  };