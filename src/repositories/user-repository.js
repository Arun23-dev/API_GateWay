const CrudRepository=require('./crud-repositories');

const {User}=require('../models');

class UserRepository extends  CrudRepository{
    constructor(){
        super(User);
    } 
    async  getUserByEmail(data){
        const user=await User.findOne(
            {
                where:{
                    email:data
                }
            }
        )
       return user;
    }

}
module.exports=UserRepository;