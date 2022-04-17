const {
    clientError,
    serverError,
    reply,
  } = require("../../utilities/response");
  const profileQuery=require("../../dataAaptor/query/profileQuery");
  const bcrypt=require("bcrypt");
  const jwt=require("jsonwebtoken");
  const appConfig=require("../../configs/app.json")
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

      async login(req,res){
          try{
          const email=req.query.email;
          const password=req.query.password
        //   first we will check whether email exist in our database or not if it will not exist will throw the error
        const checkEmail=await profileQuery.check_Email(email);
        if(checkEmail.length==0){
            let message=errorMessages.emailNotFound
            return clientError(req,res,message)
        }
        // if email is present, verify the passowrd
        let validPassword=await bcrypt.compare(password,checkEmail[0].password);
        if(!validPassword){
            let message=errorMessages.invalidPassword;
            return clientError(req,res,message)
        }
        // if the paswword is coreect will genrate json web token 
        const token=jwt.sign(
            {userId:checkEmail[0]._id},
            appConfig.jwtSecret,
            {expiresIn:"24h"}
        )
        let result={
            message:"Login Sucessfully",
            token:token,
        };
        return reply(req,res,result)



          }catch(err){
              console.log(err)
              return serverError(req,res,err)
          }
      }
    
    
  
  }
  
  module.exports = new profileController()