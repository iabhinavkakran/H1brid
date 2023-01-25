const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    seller_username: {
        type: String,
        required: [true, 'must provide Seller username']
    },
    product_name: {
        type: String,
        required: [true, 'must provide name']
    },
    product_price: {
        type: Number,
        required: [true, 'must provide price'] 
    }
})

module.exports =mongoose.model('Item', ItemSchema);
