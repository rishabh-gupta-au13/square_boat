const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const customers = new Schema({
'customerId': {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    
  },
  'productDetails':[{
      productId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'products'
      }
  }],
  'isOrderPalced':{
      type:String,
      default:"Yes"
  },
  'totalInvoice':{
      type:Number,

  }

},
{timestamps:true});

customers.index({
  'customerId': 1,
});

// exporting the entire module
module.exports = mongoose.model('products', products);