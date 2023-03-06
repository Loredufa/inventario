const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('product', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    codigo_producto: {
      type:DataTypes.STRING,
      allowNull:true,
  },
    codigo_barras: {
      type:DataTypes.STRING,
      allowNull:true,
  },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      },
    
    descripcion: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    cantidad: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    precio: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    descuento: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    iva: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    precio_compra: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    precio_venta: {
      type:DataTypes.STRING,
      allowNull:true,
    },

  })

  };