const { estimatedDocumentCount } = require('../models/customerModels');
const Customer = require('../models/customerModels');
const namdleError = require('../helpers/handleError');

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Customer.findOne({email: email, password: password});

        res.status(200).send({
            status: 'Login success',
            data: user
        });

    }catch (err) {
        handleError.customer(err,res);
    }
};

exports.signup = async(req, res) => {
    try {
        const { fristname, lastname, email, password } = req.body;

        const newCustomer = await Customer.create({
            fristname: fristname,
            lastname: lastname,
            email: email,
            password: password
        });

        res.status(200).send({
            status: 'Signup success',
            data: newCustomer

        });

    }catch (err) {
        handleError.customer(err, res);
    }
};