const { ServerConfig } = require('../../config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compare(plainPassword, encryptedPassword);
    }
    catch (error) {
        console.log(error)
        throw error
    }
}
function createToken(data) {
    try {
        return jwt.sign(data, ServerConfig.JWT_SECRET_KEY, { expiresIn: ServerConfig.JWT_EXPIRY })

    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    checkPassword, createToken
}