const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    JWT_SECRET_KEY:process.env.JWT_SECRETKEY,
    JWT_EXPIRY:process.env.JWT_EXPIRY
}; 