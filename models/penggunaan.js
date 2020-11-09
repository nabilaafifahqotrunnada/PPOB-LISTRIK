'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penggunaan extends Model {
    static associate(models) {
      this.belongsTo(models.pelanggan, {
        foreignKey : "id_pelanggan",
        as : "pelanggan"
      })
      this.hasOne(models.tagihan, {
        foreignKey : "id_penggunaan",
        as : "tagihan"
      })
    }
  };
  penggunaan.init({
    id_penggunaan : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    id_pelanggan: DataTypes.INTEGER,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    meter_awal: DataTypes.DOUBLE,
    meter_akhir: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'penggunaan',
    tableName: "penggunaan"
  });
  return penggunaan;
};