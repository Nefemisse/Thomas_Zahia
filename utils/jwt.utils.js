// Imports
require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET_SECRET
// Export function
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            //expiresIn: '1h'
        })
    }
}