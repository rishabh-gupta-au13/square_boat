const jwt=require("jsonwebtoken")
const appConfig=require("../configs/app.json")

module.exports = {
  extractUserId:(token)=>{
    const user= jwt.verify(token, appConfig.jwtSecret);
    console.log(user,"this is userId of user")
    return user
  }
};
