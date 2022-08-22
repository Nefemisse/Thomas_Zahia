const asyncLib = require('async')
const models = require('../models')

module.exports = {
    create: (request, response) => {
        // Parameters
        let idUsers = 2; // get idUser from token decode 
        let content = request.body.content;
        let attachments = request.body.attachments;
    
        // Fields verification
        if (content == "" ) {
            return response.status(400).json({'error': 'An error occured : Missing parameters'});
        }
        
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                let newPost = models.Posts.create({
                    attachments: attachments,
                    Users_idUsers: idUsers,
                    content: content
                })
                .then((newPost) => {
                    done(newPost);
                })
                .catch((err) => {
                    console.log(err)
                    return response.status(500).json({'error': 'An error occurred : unable to create posts'})
                });
            }
        ],
        (newPost) => {
            if(newPost) {
                return response.status(201).json({
                    'postId': newPost.id, sucess: 'Post successfully created'
                })
            } 
        })
    },
    update: (request, response) => {
        // Parameters
        let id = request.params.id;
        let content = request.body.content;
        let attachments = request.body.attachments;
 
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Posts.findOne({
                    attributes: [ 'id', 'content', 'attachments', 'updatedAt'],
                    where: { id: id }
                })
                .then((postFound) => {
                    done(null, postFound);
                })
                .catch((err) => {
                    return response.status(400).json({ 'error': 'Unable to verify Post' });
                });
            },
            (postFound, done) => {
                if(postFound) {
                  postFound.update({
                      content: (content ? content : postFound.content),
                      attachments: (attachments ? attachments : postFound.attachments)
                  })

                  .then((postFound) => {
                      done(postFound);
                  })
                  .catch((err) => {
                      response.status(400).json({ 'error': 'An error occurred' });
                  });
                }
                else {
                  response.status(404).json({ 'error': 'An error occurred' });
                }
            },
        ],
        (postFound) => {
            if (postFound) {
                response.status(200).json({'success': 'Post successfuly modified'})
            } else {
                response.status(400).json({ 'error': 'An error occurred' })
            } 
        })           
    },
    searchOne: (request, response) => {
        // Parameters
        const id = request.params.id;

        models.Posts.findOne({
            attributes: [ 'id', 'content', 'attachments','createdAt'],
            where: { id: id }
        })
        .then(data => {
            if (data) {
                response.status(200).send(data);
            } else {
            response.status(400).send({
                message: `An error occurred : cannot found posts with id=${id}. Maybe posts was not found!`
              });
            }
        })
        .catch(err => {
            response.status(400).send({
                message: `An error occurred : could not found posts with id=${id}.`
            });
        });
    },
    searchAllPosts: (request, response) => {
        // Parameters
        models.Posts.findAll({
            attributes: [ 'id', 'Users_idUsers','content', 'attachments']
            })
        .then(data => {
            if (data) {
                response.status(200).send(data);
            }
        })
        .catch(err => {
            response.status(400).send({
                message: err + "An error occurred : while retrieving posts."
            });
        });
    },

    // Have to verify identity with ? Token ?
    delete: (request, response) => {
        // Parameters
        const id = request.params.id;
        
        models.Posts.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            response.status(200).send({
                message: "posts successfully deleted"
                });
            } else {
                response.status(400).send({
                message: `An error occurred : cannot delete posts with id=${id}.`
                });
            }
        })
        .catch(err => {
            response.status(404).send({
                message: "Posts with id=" + id + " was not found"
            });
        });
    }
}