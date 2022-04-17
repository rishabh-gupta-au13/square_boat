const Joi = require("joi");
const { clientError, serverError } = require("../../../utilities/response");

class ValidateProduct {
 async validateAddProduct(req,res,next){
    const schema = Joi.object().keys({
        productTitle: Joi.string() .required(),
        description: Joi.string().required(),
        productPrice: Joi.number().required(),
        productCategory: Joi.string().required()
    
      });
  
      try {
        const { error } = await schema.validate(req.body);
        console.log(error);
        if (error) {
          // let message = "Please enter valid Email Id";
          return clientError(req, res, error.message);
        }
        return next();
      } catch (error) {
        return serverError(req, res, error);
      }


 }
}

module.exports = new ValidateProduct();
