const Order = require('../models/orderModels');
const Product = require('../models/productModels')
const handleError = require('../helpers/handleError');

exports.createOrder = async(req, res) => {
    try {
        const { cust_id, items  } = req.body;

        const product_ids = [];
        items.map(p => product_ids.push(p.product_id));

        let total_price = 0;
        for (let id of product_ids) {
            const product = await Product.findById({ _id: id }).select('price quantity');

            if (product.quantity <= 0) throw Error('Product are not enough.');

            total_price += Number(product.price);
        }

        const order_date = new Date(Date.now()).toISOString();

        await Order.create({
            customer_id: cust_id,
            order_date: order_date,
            items: items,
            total_price: total_price
        });

        for (let { product_id, quantity } of items) {
            await Product.updateOne({ _id: product_id }, {
                $inc: { quantity: -quantity }
            });
        }

        res.status(204).send();
    } catch (err) {
        handleError.order(err, res);
    }
};

exports.getorderBycustomerId = async(req, res) => {
    try{
        const { id } = req.params;

        const orders = await Order.find({customer_id: id});

        res.status(200).send({
            status: 'Get order success',
            data: orders
        })

    }catch (err) {
        handleError.order(err, res)
    }
};