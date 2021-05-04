'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.friendship)
      models.user.hasMany(models.chat)
    }
  };
  user.init({
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    number: DataTypes.TEXT,
    region: DataTypes.TEXT,
    sex: DataTypes.TEXT,
    status: DataTypes.TEXT,
    lookingfor: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};