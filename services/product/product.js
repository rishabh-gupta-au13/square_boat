const {
    clientError,
    serverError,
    reply,
  } = require("../../utilities/response");
  const productQuery=require("../../dataAaptor/query/productQuery");
  
  const { errorMessages } = require("../error");
  class productController {
      
      async fetchProduct(req,res){
          try{
            //   fetch all the products
            const getProducts=await productQuery.fetchProducts();
            return reply(req,res,getProducts);
          }catch(err){
              console.log(err)
              return serverError(req,res,err)
          }
      }
    
    
  
  }
  
  module.exports = new profileController()