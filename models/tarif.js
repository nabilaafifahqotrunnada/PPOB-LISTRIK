'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarif extends Model {
    static associate(models) {
      this.hasOne(models.pelanggan, {
        foreignKey : "id_tarif",
        as : "pelanggan"
      })
    }
  };
  tarif.init({
    id_tarif : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    daya: DataTypes.STRING,
    tarifperkwh: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'tarif',
    tableName: "tarif"
  });
  return tarif;
};