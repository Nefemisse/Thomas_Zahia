const express = require('express')
const usersCtrl = require('../controleur/usersCtrl')
const postsCtrl = require('../controleur/posts.ctrl')
const commentsCtrl = require('../controleur/comments.ctrl')
const likesCtrl = require('../controleur/likes.crtl')
//const likesCtrl = require('../controleur/likes.ctrl')


// Router
exports.router = (() => {
    const apiRouter = express.Router();
    // Users routes
    apiRouter.route('/users/register').post(usersCtrl.register)
    apiRouter.route('/users/login').post(usersCtrl.login)
    apiRouter.route('/users/logout').post(usersCtrl.logout)

    apiRouter.route('/user/:id').get(usersCtrl.searchOne)
    apiRouter.route('/users').get(usersCtrl.searchAll)

    apiRouter.route('/user/:id').put(usersCtrl.update)
    apiRouter.route('/user/:id').delete(usersCtrl.delete)


    // Posts routes
    apiRouter.route('/posts').post(postsCtrl.create)

    apiRouter.route('/post/:id').get(postsCtrl.searchOne)
    apiRouter.route('/posts').get(postsCtrl.searchAll)

    apiRouter.route('/post/:id').put(postsCtrl.update)
    //apiRouter.route('/post/:id/1').delete(postsCtrl.delete)


    // Comments routes
    apiRouter.route('/comments/:idPosts').post(commentsCtrl.create)

    apiRouter.route('/comment/:id').get(commentsCtrl.searchOne)
    apiRouter.route('/comments').get(commentsCtrl.searchAll)

    apiRouter.route('/comment/:id').put(commentsCtrl.update)
    //apiRouter.route('/comment/:id/1').delete(commentsCtrl.delete)


    // Likes routes
    apiRouter.route('/likes/:Posts_idPosts').post(likesCtrl.create)
    
    apiRouter.route('/likes/:id').get(likesCtrl.searchOne)
    apiRouter.route('/likes').get(likesCtrl.searchAll)

    // Admin routes


    return apiRouter;
})();