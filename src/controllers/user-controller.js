const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { UserService } = require("../services");

async function signUp(req, res) {
    try {
      
    
        const user = await UserService.createUser({
            email:req.body.email,
            password:req.body.password,
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
// async function loginUser(req,res){

// }
// async function logoutUser(req,res){

// }
module.exports = { signUp,}