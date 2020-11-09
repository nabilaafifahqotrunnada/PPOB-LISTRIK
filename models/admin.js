'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {
     this.belongsTo(models.level, {
       foreignKey : "id_level",
       as : "level"
     })
     this.hasMany(models.pembayaran, {
       foreignKey : "id_admin",
       as : "pembayaran"
     })
    }
  };
  admin.init({
    id_admin : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nama_admin: DataTypes.STRING,
    id_level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admin',
    tableName: "admin"
  });
  return admin;
};