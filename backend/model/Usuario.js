const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
    return sequelize.define(
      "USUARIO",
      {
        USUARIO_ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        EMPRESA_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        USU_USUARIO: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        USU_NOMBRE: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        USU_APELLIDO: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        USU_TELEFONO: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        USU_EMAIL: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        USU_PASS:{
            type: DataTypes.STRING(250),
            allowNull: false,
        }, 
        USU_IMAGEN:{
          type: DataTypes.STRING(256),
          allowNull: true,
        },
        USU_ROL:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        USU_ESTADO:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
        }, USU_CODIGO:{
          type: DataTypes.INTEGER, 
          allowNull: true,  
        }
      },
      {
        timestamps: false,
        tableName: "USUARIO",
      }
    );
  };