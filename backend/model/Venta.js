const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {

  return sequelize.define(
    "VENTA",
    {
      ID_VENTA: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
        EMPRESA_ID: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ID_PERIODO: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ID_TERCERO: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        CONSECUTIVO: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        FECHA: {
          type: DataTypes.TIME,
          allowNull: true,
        },
        TIPO_PAGO: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        SUBTOTAL:{
            type: DataTypes.DECIMAL(18,4),
            allowNull: true,
        },
        VALOR_IVA:{
            type:DataTypes.DECIMAL(18,4),
            allowNull: true,
        },
        FORMA_PAGO:{
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        VALOR_TOTAL:{
            type: DataTypes.DECIMAL(18,4),
            allowNull: true,
        },
        VALOR_CREDITO:{
            type: DataTypes.DECIMAL(18,4),
            allowNull: true,
        },
        VALOR_CONTADO:{
          type: DataTypes.DECIMAL(18,4),
          allowNull: true,

        },
        ID_VENDEDOR:{
          type: DataTypes.INTEGER,
          allowNull: true,
        }

      },
    {
      timestamps: false,
      tableName: "VENTA",
    }
  );
};
