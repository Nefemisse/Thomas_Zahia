const models = require('../models')

module.exports = {
    loggedIn: (request, response, next) => {
        request.cookes.auth ? models.usersCtrl.getUserMe(request, response, next) : next();
    }
}