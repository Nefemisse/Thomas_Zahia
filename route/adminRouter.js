const express = require('express')
const usersCtrl = require('../controleur/usersCtrl')
const postsCtrl = require('../controleur/posts.ctrl')
const commentsCtrl = require('../controleur/comments.ctrl')


// Router
exports.router = (() => {
    const adminRouter = express.Router();

    // Users routes
    adminRouter.route('/admin/register').post(usersCtrl.login)
    adminRouter.route('/admin/login').post(usersCtrl.logout)
    adminRouter.route('/admin/logout').post(usersCtrl.logout)

    adminRouter.route('/admin/getOneUser/:id').get(usersCtrl.searchOne)
    adminRouter.route('/admin/getAllUsers').get(usersCtrl.searchAll)

    adminRouter.route('/admin/deleteUser/:id').delete(usersCtrl.delete)

    // Posts routes
    adminRouter.route('/admin/getOnePost/:id').get(postsCtrl.searchOne)
    adminRouter.route('/admin/getAllPosts').get(postsCtrl.searchAll)

    adminRouter.route('/post/:id').delete(postsCtrl.delete)

    // Comments routes
    adminRouter.route('/comment/:id').get(commentsCtrl.searchOne)
    adminRouter.route('/comments').get(commentsCtrl.searchAll)

    adminRouter.route('/comment/:id').delete(commentsCtrl.delete)

    return adminRouter;
    
})();