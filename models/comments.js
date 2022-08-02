'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      models.Users.belongsTo/*Many*/(models.Posts, {
        through: models.Comments,
        foreignKey: 'Users_idUsers',
        otherKey: 'Posts_idPosts',
      });
      models.Posts.belongsTo/*Many*/(models.Users, {
          through: models.Comments,
          name: 'Posts_idPosts',
          otherKey: 'Users_idUsers',
      });
      models.Comments.belongsTo(models.Users, {
        foreignKey: {
          name: 'Users_idUsers'
        }
      })
      models.Comments.belongsTo(models.Posts, {
        foreignKey: {
          name: 'Posts_idPosts'
        }
      })
    }
  }
  Comments.init({
    idPosts: DataTypes.INTEGER,
    idUsers: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};