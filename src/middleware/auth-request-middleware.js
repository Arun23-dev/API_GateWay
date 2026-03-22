const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


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

module.exports = { validateAuthReq, };