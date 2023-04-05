const Product = require('../models/productModels');
const handleError = require('../helpers/handleError');

exports.createproduct = async(req, res) => {
    try{
        const { name, price, quantity, image } = req.body;

        const data = {
            name: name,
            price: price,
            quantity: quantity,
            image: image
        };

        await Product.create(data);

        res.status(204).send();

    }catch (err) {
        handleError.product(err, res);

    }

};

exports.getAllproduct = async(req, res) => {
    try{
        const product = await Product.find();

        res.status(200).send({
            status: 'Get product success',
            data: product
        })

    }catch (err) {
        handleError.product(err, res);
    }
};

exports.deleteproduct = async(req, res) => {
    try{
        const { id } = req.params;

        const product = await Product.findOne({_id: id})

        if(!product) throw Error ('Not found product');

        await Product.deleteOne({_id: id});

        res.status(204).send();

    }catch (err) {
        handleError.product(err, res)

    }
}