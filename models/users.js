'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, { foreignKey: 'Users_idUsers', onDelete: 'CASCADE' });
      this.hasMany(models.Comments, { foreignKey: 'Users_idUsers', onDelete: 'CASCADE' });
      this.hasMany(models.Likes, { foreignKey: 'Users_idUsers', onDelete: 'CASCADE' });
    }
  }
  Users.init({
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};