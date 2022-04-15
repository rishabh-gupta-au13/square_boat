const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const customers = new Schema({

productTitle:{
    type:String,
    required:true

},
productPhoto:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
productPrice:{
    type:Number,
    required:true
},
productCategory:{
    type:String,
    required:true
}
},{timestamps:true});

customers.index({
  'productTitle': 1,
  'productPrice': 1,
});

// exporting the entire module
module.exports = mongoose.model('products', products);