const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('sale', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },    
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    monto: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  })

  };