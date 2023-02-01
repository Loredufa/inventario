const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('move', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
    },    
    producto: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    cantidad: {
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    precio: {
      type:DataTypes.STRING,
      allowNull:true,
    },
  })

  };