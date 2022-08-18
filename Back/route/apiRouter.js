const express = require('express')
const usersCtrl = require('../controleur/usersCtrl')
const postsCtrl = require('../controleur/postsCtrl')
const commentsCtrl = require('../controleur/commentsCtrl')
const likesCtrl = require('../controleur/likesCrtl')
//const likesCtrl = require('../controleur/likes.ctrl')


// Router
exports.router = (() => {
    const apiRouter = express.Router();
    // Users routes
    apiRouter.route('/register').post(usersCtrl.register)
    apiRouter.route('/login').post(usersCtrl.login)
    apiRouter.route('/logout').post(usersCtrl.logout)
    apiRouter.route('/putUser').put(usersCtrl.update)
    apiRouter.route('/deleteUser').delete(usersCtrl.delete)
    apiRouter.route('/getOneUser').get(usersCtrl.searchOne)
    apiRouter.route('/getAllUsers').get(usersCtrl.searchAllUsers)

    // Posts routes
    apiRouter.route('/createPost').post(postsCtrl.create)
    apiRouter.route('/putPost').put(postsCtrl.update)
    //apiRouter.route('deletePost').delete(postsCtrl.delete)
    apiRouter.route('/getOnePost').get(postsCtrl.searchOne)
    apiRouter.route('/getAllPosts').get(postsCtrl.searchAllPosts)

    // Comments routes
    apiRouter.route('/comments/:idPosts').post(commentsCtrl.create)
    apiRouter.route('/comment/:id').put(commentsCtrl.update)
    //apiRouter.route('/comment/:id/1').delete(commentsCtrl.delete)
    apiRouter.route('/comment/:id').get(commentsCtrl.searchOne)
    apiRouter.route('/comments').get(commentsCtrl.searchAll)

    // Likes routes
    apiRouter.route('/likes/:Posts_idPosts').post(likesCtrl.create)
    apiRouter.route('/likes/:id').get(likesCtrl.searchOne)
    apiRouter.route('/likes').get(likesCtrl.searchAll)

    // Admin routes


    return apiRouter;
})();