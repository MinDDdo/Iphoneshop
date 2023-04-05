const express = require('express');
const customerControllers = require('../controllers/customerControllers');

const router = express.Router();

router.route('/login').post(customerControllers.login);
router.route('/signup').post(customerControllers.signup);
router.route('/edit/:id').put(customerControllers.updateAccount);
router.route('/delete/:id').delete(customerControllers.deleteAccount);

module.exports = router;