const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('provider', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: true,
    },   
    mail:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    web:{
        type:DataTypes.STRING,
        allowNull:true,
    }
  })

  };