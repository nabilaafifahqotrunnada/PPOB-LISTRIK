'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    static associate(models) {
      this.hasOne(models.admin, {
        foreignKey : "id_level",
        as : "admin"
      })
    }
  };
  level.init({
    id_lecel : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    nama_level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'level',
    tableName: "level"
  });
  return level;
};