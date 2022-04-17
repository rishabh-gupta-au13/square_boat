const {
    clientError,
    serverError,
    reply,
  } = require("../../utilities/response");
  const productQuery=require("../../dataAaptor/query/productQuery");
  
  const { errorMessages } = require("../error");
  class productController {
      
      async fetchProducts(req,res){
          try{
            //   fetch all the products
            const getProducts=await productQuery.fetchProducts();
            return reply(req,res,getProducts);
          }catch(err){
              console.log(err)
              return serverError(req,res,err)
          }
      }
      async addProducts(req,res){
          try{
          let {productTitle,description,productPrice,productCategory}=req.body;
          let addProductInventory=await productQuery.addProductsi(productTitle,description,productPrice,productCategory);
          if(addProductInventory.length ==0){
              return clientError(req,res,"Product Can Not Be Added")
          }
          let message={
              message:"Product Added Successfully",
              product:addProductInventory
          }
          return reply(req,res,message)
        }catch(err){
            console.log(err)
            return serverError(req,res,err)
        }
      }
    
    
  
  }
  
  module.exports = new productController()