const jwt=require("jsonwebtoken");
const appConfig=require("../../configs/app.json");
const {clientError}=require("../../utilities/response");
const userModel=require("../../dataAaptor/models/customers")



async function validateJwtToken(req,res,next){
    try{
        const token=req.headers.authorization;
        if(token){
            const user=await jwt.verify(token,appConfig.jwtSecret);
            userModel.findById(user.userId,function(error,user){
                if(error){
                    return clientError(req,res,error)
                }
                if(user){
                    next()
                }else{
                    return clientError(req,res,error)
                }

            })

        }else{
            let message="Token Required";
            return clientError(req,res,message)
        }

    }catch(err){
        console.log(err)
        return clientError(req,res,error)  
    }
   
}
module.exports={
    validateJwtToken:validateJwtToken
}
