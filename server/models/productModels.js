const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    category: String
});

module.exports = mongoose.model('Product', productShema);