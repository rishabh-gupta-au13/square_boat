const Joi = require("joi");
const { clientError, serverError } = require("../../../utilities/response");

class ValidateProfile {
  async validateCredentials(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
        .required(),

      name: Joi.string().required(),
      password: Joi.string().required(),
      mobileNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
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

module.exports = new ValidateProfile();
