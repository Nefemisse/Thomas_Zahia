const express = require('express')
const usersCtrl = require('../controleur/usersCtrl')
const postsCtrl = require('../controleur/posts.ctrl')
const commentsCtrl = require('../controleur/comments.ctrl')


// Router
exports.router = (() => {
    const adminRouter = express.Router();

    // Users routes
    adminRouter.route('/users/login').post(usersCtrl.login)
    adminRouter.route('/users/logout').post(usersCtrl.logout)

    adminRouter.route('/user/:id').get(usersCtrl.searchOne)
    adminRouter.route('/users').get(usersCtrl.searchAll)

    adminRouter.route('/user/:id').delete(usersCtrl.delete)

    // Posts routes
    adminRouter.route('/post/:id').get(postsCtrl.searchOne)
    adminRouter.route('/posts').get(postsCtrl.searchAll)

    adminRouter.route('/post/:id').delete(postsCtrl.delete)

    // Comments routes
    adminRouter.route('/comment/:id').get(commentsCtrl.searchOne)
    adminRouter.route('/comments').get(commentsCtrl.searchAll)

    adminRouter.route('/comment/:id').delete(commentsCtrl.delete)

    return adminRouter;
    
})();