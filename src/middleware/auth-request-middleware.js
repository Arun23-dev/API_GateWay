const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');


function validateAuthReq(req, res, next) {
    let errors = [];
    if (!req.body.email) {
        errors.push('email not found in the incoming request in correct form');
    }
    if (!req.body.password) {
        errors.push('Password not found in the incoming request in correct form');
    }

    if (errors.length > 0) {
        ErrorResponse.message = "Something went wrong while doing authenticating";
        ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
async function checkAuth(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token =
            req.headers['x-access-token'] ||
            (authHeader && authHeader.split(' ')[1]);

        if (!token) {
            throw new AppError('JWT token missing', 400);
        }

        const response = await UserService.isAuthenticated(token);

        if (response) {
            req.user = response;
            next();
        }

        throw new AppError('Unauthorized', 401);

    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                message: error.message || 'Something went wrong'
            });
    }
}

module.exports = { validateAuthReq,checkAuth};