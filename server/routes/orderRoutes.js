const express = require('express');
const orderControllers = require('../controllers/orderControllers');

const router = express.Router();

router.route('/create').post(orderControllers.createOrder);
router.route('/:id').get(orderControllers.getorderBycustomerId);

module.exports = router;