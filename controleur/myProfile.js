const models = require('../models')

module.exports = {
    loggedIn: (request, response, next) => {
        if (request.cookes.auth) {
            models.usersCtrl.getUserMe(request, response, next);
        } else {
            next();
        }
    }
}