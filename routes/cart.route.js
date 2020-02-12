const express = require('express')
var router = express.Router();

var controller = require('../controller/cart.controller');

router.get('/add/:productID', controller.addToCart);

module.exports = router;