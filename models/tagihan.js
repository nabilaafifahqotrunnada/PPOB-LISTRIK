'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tagihan extends Model {
    static associate(models) {
      this.belongsTo(models.penggunaan, {
        foreignKey : "id_penggunaan",
        as : "penggunaan"
      })
      this.hasOne(models.pembayaran, {
        foreignKey : "id_tagihan",
        as : "pembayaran"
      })
    }
  };
  tagihan.init({
    id_tagihan : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    id_penggunaan: DataTypes.INTEGER,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    jumlah_meter: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tagihan',
    tableName: "tagihan"
  });
  return tagihan;
};