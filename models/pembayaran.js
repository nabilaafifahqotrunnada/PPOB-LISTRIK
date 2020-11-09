'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    static associate(models) {
      this.belongsTo(models.tagihan, {
        foreignKey : "id_tagihan",
        as : "tagihan"
      })

    }
  };
  pembayaran.init({
    id_pembayaran : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    id_tagihan: DataTypes.INTEGER,
    tanggal_pembayaran: DataTypes.DATE,
    bulan_bayar: DataTypes.STRING,
    biaya_admin: DataTypes.INTEGER,
    total_bayar: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    bukti: DataTypes.STRING,
    id_admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pembayaran',
    tableName: "pembayaran"
  });
  return pembayaran;
};