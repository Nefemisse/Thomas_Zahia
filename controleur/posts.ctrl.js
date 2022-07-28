const asyncLib = require('async')
const models = require('../models')

module.exports = {
    create: (request, response) => {
        // Parameters
        let content = request.body.content;
        let attachments= request.body.attachments;

        // Fields verification
        if (content == null) {
            return response.status(400).json({'error': 'An error occured : Missing parameters'});
        }
        
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                let newPost = models.Posts.create({
                    attachments: attachments,
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
        //
    }
}