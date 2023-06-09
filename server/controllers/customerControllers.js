const { estimatedDocumentCount } = require('../models/customerModels');
const Customer = require('../models/customerModels');
const handleError = require('../helpers/handleError');

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Customer.findOne({email: email, password: password});

        if(!user) throw Error('Email or password invalid')

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
            

        });

    }catch (err) {
        handleError.customer(err, res);
    }
};

exports.updateAccount = async(req, res) => {
    try{
        const { id } = req.params;
        const { fristname, lastname, email } = req.body;

        const account = await Customer.findOne({_id: id})

        if(!account) throw Error ('Not found account');

        const data = {
            fristname: fristname,
            lastname: lastname
        }
        await Customer.updateOne({_id: id}, data);

        res.status(204).send();
    }catch (err) {
        handleError.customer(err,res);

    }
}

exports.deleteAccount = async(req, res) => {
    try{
        const { id } = req.params;
        

        const account = await Customer.findOne({_id: id})

        if(!account) throw Error ('Not found account');

        await Customer.deleteOne({_id: id});

        res.status(204).send();
    }catch (err) {
        handleError.customer(err,res);

    }
}