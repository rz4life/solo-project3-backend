'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chat.belongsTo(models.user, {foreignKey: 'userId', constraints:false})
      models.chat.belongsTo(models.user, {as: "chatmessage", foreignKey: 'userId2', constraints:false})
      models.chat.hasMany(models.message)
      
    }
  };
  chat.init({
    userId: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};