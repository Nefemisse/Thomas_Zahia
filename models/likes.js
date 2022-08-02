/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    let Likes = sequelize.define('Like', {
      postsId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts',
          key: "id"
        }
      },
      idUsers: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    }, {});
    Likes.associate = (models) => {
    /*class Likes extends Model {
      /*static associate(models) {*/
/*models.Users.belongsToMany(models.Posts, {
          through: models.Likes,
          as: 'Users',
          foreignKey: 'Users_idUsers',
          otherKey: 'Posts_idPosts',
        });
        models.Posts.belongsToMany(models.Users, {
            through: models.Likes,
            as: "Posts",
            name: 'Posts_idPosts',
            otherKey: 'Users_idUsers',
        });*
        models.Likes.belongsTo(models.Users, {
          foreignKey: 'Users_idUsers',
          /*as: 'Users',*
        });
        models.Likes.belongsTo(models.Posts, {
          foreignKey: 'Posts_idPosts',
          /*as: 'Posts',*
        });
    }
  Likes.init({
    idPosts: DataTypes.INTEGER,
    idUsers: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};*/

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      models.Likes.belongsTo(models.Users, {
        foreignKey: {
          name: "Users_idUsers",
        },
      });
      models.Likes.belongsTo(models.Posts, {
        foreignKey: {
          name: "Posts_idPosts",
        },
      });
    }
  }
  Likes.init(
    {
      Posts_idPosts: DataTypes.INTEGER,
      Users_idUsers: DataTypes.INTEGER,
      like: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
