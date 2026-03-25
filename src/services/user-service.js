const { StatusCodes } = require('http-status-codes');
const { UserRepository,RoleRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error');
const { Auth,Enum } = require('../utils/common')

const userRepository = new UserRepository();
const roleRepository=new RoleRepository();

async function register(data) {
    try {

        const user = await userRepository.create(data);
        const role =await roleRepository.getRoleByName(Enum.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;

    }
    catch (error) {
        if (error.name == 'SequelizeValidationError' | error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function signin(data) {
    try {

        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError("User not found for the given email", StatusCodes.NOT_FOUND)

        }
        const passwordMatch = await Auth.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);

        }
        const jwt = Auth.createToken({ id: user.id, email: user.email })
        return jwt;
    }
    catch (error) {

        if (error instanceof AppError) {
            throw error;
        }
        console.log(error);

    }
}
async function isAuthenticated(token) {
    try {
        if (token) {
            throw new AppError("Missing tokenn in the request", StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if (!user) {
            throw new AppError("No user found", StatusCodes.BAD_REQUEST);
        }
        return user.id;
    }
    catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        if (error.name =='JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST)
        
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError("Token Expired ",StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError("Something went wrong ", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports = { register, signin, isAuthenticated };



