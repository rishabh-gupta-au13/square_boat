const jwt=require("jsonwebtoken");
const appConfig=require("../../configs/app.json");
const {clientError}=require("../../utilities/response");
const appConfig=require("../../configs/app.json");
const userModel=require("../../dataAaptor/models/customers")



function validateJwtToken(req,res,next){
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

        }

    }catch(err){
        
    }
   
}
