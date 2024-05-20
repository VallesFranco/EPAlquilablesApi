'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro extends Model {
    static associate(models) {
      Registro.belongsTo(models.Alquilable, {
        as: 'Alquilable',
        foreignKey: 'rentable_id'
      })
      Registro.belongsTo(models.Cliente, {
        as: 'cliente',
        foreignKey: 'cliente_id'
      })
    }
  }
  Registro.init({
    fecha: DataTypes.DATEONLY,
    abono: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Registro',
    tableName: 'RegistroAlquilable'
  });
  return Registro;
};