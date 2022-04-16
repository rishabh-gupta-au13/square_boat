const orderModel=require("../models/order");

class orderQuery {
    async place_Order(productDetails){
        try{
            let totalPrice=0
            for(let i=0;i<productDetails.length;i++){
                console.log(parseInt(productDetails[i].price),"this is price")
                totalPrice=totalPrice+parseInt(productDetails[i].price)

            }
            return totalPrice
            

        }catch(err){
            console.log(err)
        }
    }
    async saveOrders(userId,orderId,price,productDetails){
        try{
            const order=new orderModel({
                customerId:userId,
                productDetails:[...productDetails],
                totalInvoice:price,
            })
            let saveOrder=await order.save();
            return saveOrder

        }catch(err){
            console.log(err)
        }
    }
    
  }
  
  module.exports = new orderQuery();
  