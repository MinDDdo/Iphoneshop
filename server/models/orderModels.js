const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: String,
    order_date: Date,
    items:[
        {
            product_id: String ,
            quantity: Number
        }
    ],
    total_price: Number
});
module.exports = mongoose.model('Order', orderSchema);