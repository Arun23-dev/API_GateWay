const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    // NODE_ENV: process.env.NODE_ENV || 'development',
    // DB_HOST: process.env.DB_HOST || 'localhost',
    // DB_PORT: process.env.DB_PORT || 5432,
    // DB_NAME: process.env.DB_NAME || 'flight_booking',
    // DB_USER: process.env.DB_USER || 'root',
    // DB_PASSWORD: process.env.DB_PASSWORD || '',
}; 