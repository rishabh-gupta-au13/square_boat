const express = require('express');
const app = express.Router();
const {validateJwtToken}=require("../../middleware/auth/verifyJwtToken");
const orderController=require("../../services/order/order");
// const uploadToAzure=require("../../utilities/fileHandler");
const profileValidator=require("../../middleware/validation/order/order");

app.post("/placeOrder",validateJwtToken,orderController.placeOrder);
app.get("/trackOrder",validateJwtToken,orderController.trackOrder);
app.get("/allOrders",validateJwtToken,orderController.getAllorder);



module.exports = app;