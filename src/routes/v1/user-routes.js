const {UserController}=require('../../controllers');
const {UserMiddleware}=require('../../middleware')


const express=require('express');
const router=express.Router();

router.post('/signup',
    UserMiddleware.validateAuthReq,
    UserController.signUp);

router.post('/signin',
     UserMiddleware.validateAuthReq,
    UserController.signIn);
    
module.exports=router;