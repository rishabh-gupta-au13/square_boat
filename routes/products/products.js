const express = require('express');
const app = express.Router();
const {validateJwtToken}=require("../../middleware/auth/verifyJwtToken");
const productController=require("../../services/product/product");
// const uploadToAzure=require("../../utilities/fileHandler");
// const profileValidator=require("../../middleware/validation/profile/profile");
// app.post('/uploadProfile',validateJwtToken,uploadToAzure.single('file'),profileController.uploadProfile);
// app.post('/updateEmail',validateJwtToken,profileValidator.validateEmail,profileController.updateEmail);

// Display alll the products
app.get("/allProducts",validateJwtToken,productController.fetchProducts)


module.exports = app;