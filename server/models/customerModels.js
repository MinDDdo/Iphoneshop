const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true},
    password: String
});

module.exports = mongoose.model('Customer', customerSchema);