const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer_username: {
        type: String,
        required: [true, 'must provide Buyer Username']
    },
    product_name: {
        type: String,
        required: [true, 'must provide Product Name']
    },
    product_quantity: {
        type: Number,
        required: [true, 'must provide Product Quantity'] 
    },
    total_price: {
        type: Number
    }
})

module.exports =mongoose.model('Order', OrderSchema);
