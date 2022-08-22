const asyncLib = require('async')
const models = require('../models')



module.exports = {
    create: (request, response) => {
        // Parameters  
        let content = request.body.content;
        let idUsers = request.cookies.idUsers; // get token cookie
        let idPosts = request.params.idPosts; // get idPosts from params URI

        // Fields verification
        if (content == "" || idUsers == "" || idPosts == "") {
            return response.status(400).json({'error': 'An error occured : Missing parameters'});
        }
        
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                let newComment = models.Comments.create({
                    content: content,
                    Users_idUsers: idUsers,
                    Posts_idPosts: idPosts
                })
                .then((newComment) => {
                    done(newComment);
                })
                .catch((err) => {
                    return response.status(500).json({'error': 'An error occurred : unable to create comment'})
                });
            }
        ],  
        (newComment) => {
            if(newComment) {

                return response.status(201).json({
                    'commentId': newComment.id, sucess: 'Comment successfully created'
                })
            } 
        }) 
        //
    },
    update: (request, response) => {
        // Parameters 
        let id = request.params.id;
        let content = request.body.content;
 
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Comments.findOne({
                    attributes: [ 'id', 'content'],
                    where: { id: id }
                })
                .then((commentFound) => {
                    done(null, commentFound);
                })
                .catch((err) => {
                    return response.status(400).json({ 'error': 'Unable to verify Comment' });
                });
            },
            (commentFound, done) => {
                if(commentFound) {
                    commentFound.update({
                        content: (content ? content : commentFound.content)
                    })

                    .then((commentFound) => {
                        done(commentFound);
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
            (commentFound) => {
                if (commentFound) {
                    response.status(200).json({'success': 'Comment successfuly modified'})
                } else {
                    response.status(400).json({ 'error': 'An error occurred' })
                } 
            }
        )           
    },
    searchOne: (request, response) => {
        // Parameters
        const id = request.params.id;  

        models.Comments.findOne({
            attributes: [ 'id', 'content'],
            where: { id: id }
        })
        .then(data => {
            if (data) {
                response.status(200).send(data);
            } else {
            response.status(400).send({
                message: `An error occurred : cannot found comment with id=${id}. Maybe comment was not found!`
              });
            }
        })
        .catch(err => {
            response.status(400).send({
                message: `An error occurred : could not found comment with id=${id}.`
            });
        });
    },
    searchAll: (request, response) => {
        models.Comments.findAll({
            attributes: [ 'id', 'content']
            })
        .then(data => {
            if (data) {
                response.status(200).send(data);
            }
        })
        .catch(err => {
            response.status(400).send({
                message: "An error occurred : while retrieving comment."
            });
        });
      },
    delete: (request, response) => {
        // Parameters
        const id = request.params.id;
        let deleted = 0;
        let role = 0;
        
        if (deleted == 0 && role) {
            deleted = 1;
        } else if (role == 2 && deleted == 1) {
            deleted = 2;
        }

        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Comments.findOne({
                    attributes: [ 'id', 'content'],
                    where: { 
                        id: id,
                        isDeleted: 0 || 1
                    }
                })    
                .then((commentFound) => {
                    done(commentFound);
                })
                .catch((err) => {
console.log(err)
                    return response.status(400).json({error: `An error occured : Unable to find comment ${id}`});
                });
            },
            (commentFound, done) => {
                models.Comments.destroy({
                    where: { 
                        id: id,
                        isDeleted: 1
                    }
                })
                .then((commentDelete) => {
                    done(commentDelete);
                })
                .catch((err) => {
console.log(err)
                    return response.status(500).json({'error': 'An error occurred : unable to verify Comment'})
                });
            }
        ],
        (commentDelete) => {
            if(commentDelete) {
                return response.status(201).json({
                    'Comment': Comments.id, 'sucess': 'Comment successfully deleted'
                })
            } else {
                return res.status(400).json({ 'error': 'An error occurred : Comment already deleted.'})
            }
        })
    }
}