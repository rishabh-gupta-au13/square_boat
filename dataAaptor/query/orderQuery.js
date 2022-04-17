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
          // console.log(trackOrder,"============================================")
          return trackOrder
    }
   
    return [];
  }
  async fetchOrder(userId){
      // const fetchAllorders=await orderModel.find({customerId:userId})
      const fetchAllorders=await orderModel.aggregate([
        {$match:{customerId: mongoose.Types.ObjectId(userId)}},
        {$lookup:{
          from:"products",
          localField:"productDetails.productId",
          foreignField:"_id",
          as:"productDetailsadditional"
      }},
      {$project:{"productsDetails.productId":1,"isOrderPlaced":1,"totalInvoice":1,"createdAt":1,"productDetailsadditional.productTitle":1}},
      // {$unwind:"productsDetailsadditional.$.productTitle"}
      
        
      ])
      return fetchAllorders
  }
  async placed_order(userId,productId,productPrice){
    try {
        console.log(productId,"this is product id")
    let productsId=mongoose.Types.ObjectId(productId)
    console.log(productsId,"this is products id")

        const order = new orderModel({
          customerId: userId,
          productDetails: [{
              productId:productsId
          }],
          totalInvoice: productPrice,
        });
        let saveOrder = await order.save();
        return saveOrder;
      } catch (err) {
        console.log(err);
      }

  }
  async getOrrder(orderId){
      let getorderForcustomer=await orderModel.find({_id})
  }
}

module.exports = new orderQuery();
