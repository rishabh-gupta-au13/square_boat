const productModel = require("../models/products");
class productQuery {
  async fetchProducts() {
    const product = await productModel.find({});
    return product;
  }
  async addProductsi(productTitle, description, productPrice, productCategory) {
    try {
      const newProducts = new productModel({
        productTitle: productTitle,
        productPhoto:
          "https://waycoolstorage.blob.core.windows.net/receivable/file-fee535f2-a196-46d9-bd7a-fb5b84057847.png",
        description: description,
        productPrice: productPrice,
        productCategory: productCategory,
      });
         const productAdded= await newProducts.save()
      return productAdded;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new productQuery();
