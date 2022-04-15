const customerModel=require("../models/customers")
class profileQuery {
    async checkEmail(email,mobileNumber){
        try{
            let emailCheck=await customerModel.find({$or:[{email:email},{mobileNumber:mobileNumber}]})
            if(emailCheck.length>1){
                return true
            }
            return false

        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }
    async saveUser(email,name,hashPassword,mobileNumber){
        try{
            const user =new customerModel({
                email:email,
                name:name,
                password:hashPassword,
                mobileNumber:mobileNumber,
            })
            const newUser=await user.save()
            console.log(newUser,"=============================>")
            return newUser

        }catch(err){
            console.log(err)
            throw new Error(err.message);
        }

    }
  
  
 
   
}

module.exports = new profileQuery();
