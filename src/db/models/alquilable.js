'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alquilable extends Model {
    static associate(models) {
      Alquilable.hasMany(models.Registro, {
        as: 'registros',
        foreignKey: 'rentable_id'
      })
    }
  }
  Alquilable.init({
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponible: DataTypes.BOOLEAN,
    precio: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Alquilable',
    tableName: 'Rentable',
    timestamps: false,
  });
  return Alquilable;
};