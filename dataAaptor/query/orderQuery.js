const orderModel = require("../models/order");
const mongoose=require('mongoose')
const ObjectId=require('mongoose').ObjectId

class orderQuery {
  async place_Order(productDetails) {
    try {
      let totalPrice = 0;
      for (let i = 0; i < productDetails.length; i++) {
        console.log(parseInt(productDetails[i].price), "this is price");
        totalPrice = totalPrice + parseInt(productDetails[i].price);
      }
      return totalPrice;
    } catch (err) {
      console.log(err);
    }
  }
  async saveOrders(userId,price, productDetails) {
    try {
      const order = new orderModel({
        customerId: userId,
        productDetails: [...productDetails],
        totalInvoice: price,
      });
      let saveOrder = await order.save();
      return saveOrder;
    } catch (err) {
      console.log(err);
    }
  }
  async track_Order(userId, orderId) {
    const check1=mongoose.Types.ObjectId.isValid(orderId);
    if(check1){
        const trackOrder = await orderModel.find({
            $and: [{ customerId: userId }, { _id: orderId }],
          });
          console.log(trackOrder,"============================================")
          return trackOrder
    }
   
    return [];
  }
}

module.exports = new orderQuery();
