const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors({
    origin: [''],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(bodyParser.json());

//http:localhost:8080/api/v1/customer/login
//http:localhost:8080/api/v1/customer/signup
app.use('/api/v1/customer', customerRoutes);

module.exports = app;              