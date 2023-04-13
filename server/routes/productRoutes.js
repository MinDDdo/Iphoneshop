const express = require('express');
const productControllers = require('../controllers/productControllers');

const router = express.Router();

router.route('/create').post(productControllers.createproduct);
router.route('/').get(productControllers.getAllproduct);
router.route('/delete/:id').delete(productControllers.deleteproduct);
router.route('/:id').get(productControllers.getProductById);

module.exports = router;