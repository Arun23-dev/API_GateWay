const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { UserService } = require("../services");
const AppError = require('../utils/errors/app-error');

async function signUp(req, res) {
    try {

        const user = await UserService.register({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {

        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}
async function signIn(req, res) {
    try {

        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {

        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}
module.exports = { signUp, signIn }