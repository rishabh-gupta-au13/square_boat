const productModel = require("../models/product");
class productQuery {
    async fetchProducts(){
        const product=await productModel.find({})
        return product
    }
 
}

module.exports = new productQuery();
