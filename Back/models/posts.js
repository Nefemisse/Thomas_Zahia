'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      models.Posts.belongsTo(models.Users, {
        foreignKey: {
          name: 'Users_idUsers'
        }
      });

      models.Posts.hasMany(models.Likes,
        { onDelete: 'cascade' });
      models.Posts.hasMany(models.Comments,
        { onDelete: 'cascade' });
    }
  }
  Posts.init({
    Users_idUsers: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    attachments: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};