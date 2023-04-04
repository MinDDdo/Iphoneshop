const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
    order_date: Date,
    items:[
        {
            product_id: String ,
            quantity: Number
        }
    ],
    total_price: Number
});
module.exports = mongoose.model('Order', ordertSchema);