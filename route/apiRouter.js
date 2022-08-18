const express = require('express')
const usersCtrl = require('../controleur/usersCtrl')
const postsCtrl = require('../controleur/posts.ctrl')
const commentsCtrl = require('../controleur/comments.ctrl')
const likesCtrl = require('../controleur/likes.crtl')


// Router
exports.router = (() => {
    const apiRouter = express.Router();
    // Users routes
    apiRouter.route('/register').post(usersCtrl.register)
    apiRouter.route('/login').post(usersCtrl.login)
    apiRouter.route('/logout').post(usersCtrl.logout)

    apiRouter.route('/me').get(usersCtrl.getUserMe)
    apiRouter.route('/getOneUser/:id').get(usersCtrl.searchOne)
    apiRouter.route('/getAllUsers').get(usersCtrl.searchAll)

    apiRouter.route('/putUser/:id').put(usersCtrl.update)
    apiRouter.route('/deleteUser/:id').delete(usersCtrl.delete)


    // Posts routes
    apiRouter.route('/createPost').post(postsCtrl.create)

    apiRouter.route('/getOnePost/:id').get(postsCtrl.searchOne)
    apiRouter.route('/getAllPosts').get(postsCtrl.searchAll)

    apiRouter.route('/putPost/:id').put(postsCtrl.update)
    apiRouter.route('/deletePost/:id').delete(postsCtrl.delete)


    // Comments routes
    apiRouter.route('/createComment/:idPosts').post(commentsCtrl.create)

    apiRouter.route('/getOneComment/:id').get(commentsCtrl.searchOne)
    apiRouter.route('/getAllComments').get(commentsCtrl.searchAll)

    apiRouter.route('/putComment/:id').put(commentsCtrl.update)
    //apiRouter.route('/comment/:id/1').delete(commentsCtrl.delete)


    // Likes routes
    apiRouter.route('/createPost/:Posts_idPosts').post(likesCtrl.create)
    
    apiRouter.route('/getOneLike/:id').get(likesCtrl.searchOne)
    apiRouter.route('/getAllLikes').get(likesCtrl.searchAll)

    // Admin routes


    return apiRouter;
})();