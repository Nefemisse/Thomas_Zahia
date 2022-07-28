const express = require('express')
const usersCtrl = require('../controleur/usersCtrl')
const postsCtrl = require('../controleur/posts.ctrl')

// Router
exports.router = (() => {
    const apiRouter = express.Router();
    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)
    apiRouter.route('/user/:id/').put(usersCtrl.update)
    apiRouter.route('/user/:id/').delete(usersCtrl.delete)
    apiRouter.route('/user/:id/').get(usersCtrl.searchOne)
    apiRouter.route('/users/').get(usersCtrl.searchAll)

    // Posts routes
    apiRouter.route('/posts/create/').post(postsCtrl.create)
    //apiRouter.route('/post/:id/').put(postsCtrl.update)
    //apiRouter.route('/post/:id/').delete(postsCtrl.delete)
    //apiRouter.route('/post/:id/').get(usersCtrl.searchOne)
    //apiRouter.route('/posts/').get(usersCtrl.searchAll)

    // Comments routes
    //apiRouter.route('/comments/create/').post(postsCtrl.create)
    //apiRouter.route('/comment/:id/').put(postsCtrl.update)
    //apiRouter.route('/comment/:id/').delete(postsCtrl.delete)
    //apiRouter.route('/comment/:id/').get(usersCtrl.searchOne)
    //apiRouter.route('/comments/').get(usersCtrl.searchAll)

    // Likes routes
    //apiRouter.route('/likes/create/').post(postsCtrl.create)
    //apiRouter.route('/like/:id/').delete(postsCtrl.delete)
    //apiRouter.route('/like/:id/').get(usersCtrl.searchOne)
    //apiRouter.route('/likes/').get(usersCtrl.searchAll)

    return apiRouter;
})();