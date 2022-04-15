const express = require('express');
const app = express.Router();
// const {validateJwtToken}=require("../../middleware/auth/verifyJwtToken");
const profileController=require("../../services/profile/profile");
// const uploadToAzure=require("../../utilities/fileHandler");
const profileValidator=require("../../middleware/validation/profile/profile")
// app.post('/uploadProfile',validateJwtToken,uploadToAzure.single('file'),profileController.uploadProfile);
// app.post('/updateEmail',validateJwtToken,profileValidator.validateEmail,profileController.updateEmail);

app.get('/check',(req,res)=>{
    res.status(200).json({
        "success":"true",
        'message':"This is test api "
    })
})
app.post('/signup',profileValidator.validateCredentials,profileController.signUp);
app.get('/login',profileValidator.validateLoginCredentials,profileController.login);

module.exports = app;