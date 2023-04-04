const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    image: String
});

module.exports = mongoose.model('Product', productSchema);