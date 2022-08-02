const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/jwt.utils");
const LIKED = 1;
const DISLIKED = 0;
// Routes
module.exports = {
  create: (request, response) => {
    // Getting auth header
    //let headerAuth = req.header['authorization'];
    let idUsers = request.body.idUsers;
    // Params
    var postId = parseInt(request.params.Posts_idPosts);

    if (postId <= 0) {
      return response.status(400).json({ error: "invalid parameters" });
    }
    asyncLib.waterfall(
      [
        (done) => {
          // models.Users.findOne({
          //   where: { id: idUsers },
          // })
          // models.Users.findByPk(idUsers)
          models.Users.findOne({
            attributes: [`id`],
            where: {
              id: idUsers,
            },
          })
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              console.log(err);
              // console.log(err, idUsers,postId)
              return response
                .status(500)
                .json({ error: "unable to verify user" });
            });
        },
        function (userFound, done) {
          if (userFound) {
            models.Posts.findOne({
              attributes: [`id`],
              where: {
                id: postId,
              },
            })
              .then(function (postFound) {
                done(null, userFound, postFound);
              })
              .catch(function (err) {
                console.log(err, idUsers, postId);
                return response
                  .status(500)
                  .json({ error: "unable to verify post" });
              });
          } else {
            response.status(404).json({ error: "post already liked" });
          }
        },
        function (postFound, userFound, done) {
          if (userFound) {
            models.Likes.findOne({
              attributes: [`Users_idUsers`, `Posts_idPosts`],
              where: {
                Users_idUsers: idUsers,
                Posts_idPosts: postId,
              },
            })
              .then(function (userAlreadyLikedFound) {
                done(null, postFound, userFound, userAlreadyLikedFound);
              })
              .catch(function (err) {
                console.log(err, idUsers, postId);
                return response
                  .status(500)
                  .json({ error: "unable to verify is user already liked" });
              });
          } else {
            response.status(404).json({ error: "user not exist" });
          }
        },
        function (postFound, userFound, userAlreadyLikedFound, done) {
          if (!userAlreadyLikedFound) {
            let newLikes = models.Likes.create({
              like: 1,
              Users_idUsers: idUsers,
              Posts_idPosts: postId,
            })
              .then((newPost) => {
                done(newLikes);
              })
              .catch((err) => {
                return response.status(500).json({
                  error: "An error occurred : unable to create likes",
                });
              });
          } else {
            if (userAlreadyLikedFound.isLike === DISLIKED) {
              userAlreadyLikedFound
                .update({
                  isLike: LIKED,
                })
                .then(function () {
                  done(null, postFound, userFound);
                })
                .catch(function (err) {
                  response
                    .status(500)
                    .json({ error: "cannot update user reaction" });
                });
            } else {
              response.status(409).json({ error: "message already liked" });
            }
          }
        },
        function (postFound, userFound, done) {
          postFound
            .update({
              likes: postFound.likes + 1,
            })
            .then(function () {
              done(postFound);
            })
            .catch(function (err) {
              response
                .status(500)
                .json({ error: "cannot update post like counter" });
            });
        },
      ],
      function (postFound) {
        if (postFound) {
          return response.status(201).json(postFound);
        } else {
          return response.status(500).json({ error: "cannot update post" });
        }
      }
    );
  },
};
/*
const Like = models.likes;

exports.findAllLiks = (req, res, next) => {
  Like.findAll({where: {
    Posts_idPosts: req.params.id
  }})
  .then(likes => {
console.log(likes);
res.status(200).json({data: likes});
  })
  .catch(error => res.status(400).json({error}));
};

exports.createLike = (req, res, next) => {
  const likeObject = req.body;
    Like.findAll({where: {
      Posts_idPosts: req.params.id,
      idUsers: req.body.idUsers
    }})
    .then(likes => {
      if(likes.length === 0) {
        const like = new Like({
          ...likeObject
        });
        like.save()
        .then (() => {
          Like.findAll({
            where: {Posts_idPosts: req.params.id}
          })
          .then (likes => {
            res.status(200).json({ like: likes.length});
          })
        })
        .catch(error => res.status(400).json({ error }));
      } else {
        Like.destroy({where: {
          Posts_idPosts: req.params.id,
          idUsers: req.body.idUsers
        }})
        .then(() => {
          Like.findAll({
            where: {Posts_idPosts: req.params.id}
          })
          .then(likes => {
            res.status(200).json({ like: likes.length})
          })
        })
        .catch(error => res.status(400).json({error}))
      }
    })
}*/
