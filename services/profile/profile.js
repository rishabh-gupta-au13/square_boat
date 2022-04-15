const {
    clientError,
    serverError,
    reply,
  } = require("../../utilities/response");
  const profileQuery=require("../../dataAaptor/query/profileQuery");
  const bcrypt=require("bcrypt");
//   const get_userId=require("../../utilities/helper");
  const { errorMessages } = require("../error");
  class profileController {
      async signUp(req,res){
          try{
            //   taking all the credential from user
              let {email,name,password,mobileNumber}=req.body;
              console.log(req.body)
            //   checking whether email and mobileNumber is unique or not , it should not be present in our collection
            const checkEmailAndPhone=await profileQuery.checkEmail(email,mobileNumber)
            if(checkEmailAndPhone){
                let meassage=errorMessages.alreadyExist
                return clientError(req,res,message)
            }
            // Now Hasing the password
            let salt=await bcrypt.genSalt(10);
            let hashPassword=await bcrypt.hash(password,salt);
            // creating the user and saving in collection
            let newUser=await profileQuery.saveUser(email,name,hashPassword,mobileNumber);
            let result={message:"User Created sucessfully",user:newUser};
            return reply(req,res,result);



          }catch(err){
              console.log(err);
              return serverError(req,res,err)
          }
      }
    
    async updateEmail(req,res){
      try{
      const token=req.headers.authorization;
      const email=req.body.email;
      const userId=await get_userId.extractUserId(token);
      const updateEmail=await profileQuery.updateEmail(userId.userId,email)
      const message=errorMessages.emailNotUpdated
      if(updateEmail){
        return reply(req,res,"Email Updated SucessFully")
      }
  
      return serverError(req,res,message)
      
      }catch(err){
        return serverError(req,res,err)
      }
  
    }
  
  }
  
  module.exports = new profileController()