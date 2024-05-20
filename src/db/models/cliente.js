'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.Registro, {
        as: 'registros',
        foreignKey: 'cliente_id'
      })
    }
  }
  Cliente.init({
    nombre: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATEONLY,
    edad: {
        type: new DataTypes.VIRTUAL(DataTypes.INTEGER, ['fechaNacimiento']),
        get: function () {
            return Math.floor(
            (new Date() - new Date(this.get('fechaNacimiento'))) / (1000 * 60 * 60 * 24 * 365.25));
        },
    }
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};