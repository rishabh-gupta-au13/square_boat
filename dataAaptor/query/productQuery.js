const productModel = require("../models/products");
class productQuery {
    async fetchProducts(){
        const product=await productModel.find({})
        return product
    }
 
}

module.exports = new productQuery();
