const {
    clientError,
    serverError,
    reply,
  } = require("../../utilities/response");
  const orderQuery=require("../../dataAaptor/query/orderQuery");
  const { errorMessages } = require("../error");
  const get_userId=require("../../utilities/helper");
  const { v4: uuidv4 } = require('uuid')
  class orderController {
      
      async placeOrder(req,res){
          try{
              const token =req.headers.authorization;
              const userId=await get_userId.extractUserId(token);
              console.log(userId.userId,"this is userId ===========================");
              const orderId=uuidv4()
            //   console.log(orderId)
            //   console.log(req.body.productDetails)
              let productDetails=req.body.productDetails;
              const getTotalPrice=await orderQuery.place_Order(productDetails);
              const saveOrders=await orderQuery.saveOrders(userId.userId,orderId,getTotalPrice,productDetails)

              

            // to get user id from token and then generate unique order id and store in database
            let message={
                message:"Order Placed Sucessfully",
                orderId:saveOrders._id
            }

        
            return reply(req,res,message);
          }catch(err){
              console.log(err)
              return serverError(req,res,err)
          }
      }
      async trackOrder(req,res){
          try{
          const token=req.headers.authorization;
          const userId=await get_userId.extractUserId(token)
          let orderId=req.query.orderId
        //   Now check in the collection with userid whether the combination of userid is present or nor
        const trackOrderId=await orderQuery.track_Order(userId.userId,orderId);
        if(trackOrderId.length==0){
            let message=errorMessages.notcorrectOrderId
            return clientError(req,res,message)
        }
    }catch(err){
        console.log(err)
        return serrverError(req,res,err)
    }
      }
    
    
  
  }
  
  
  module.exports = new orderController()