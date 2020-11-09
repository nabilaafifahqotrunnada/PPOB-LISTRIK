'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pelanggan extends Model {
    static associate(models) {
      this.belongsTo(models.tarif, {
        foreignKey : "id_tarif",
        as : "tarif"
      })
      this.hasMany(models.penggunaan, {
        foreignKey : "id_pelanggan",
        as : "penggunaan"
      })
    }
  };
  pelanggan.init({
    id_pelanggan : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nomor_kwh: DataTypes.STRING,
    nama_pelanggan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    id_tarif: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pelanggan',
    tableName: "pelanggan"
  });
  return pelanggan;
};