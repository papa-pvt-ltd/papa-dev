const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const OrderSchema = new mongoose.Schema({
    totalAmount:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productIds: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }],
    orderId: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    deliveryExpected: {
        type: String,
        required: true
    },
    orderPlaced: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    referenceNum:{
        type: String,
        required:true,
        unique: true
    }
  
    
});

OrderSchema.plugin(uniqueValidator);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
