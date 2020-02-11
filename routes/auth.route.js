const express = require('express')
var router = express.Router();

var controller = require('../controller/auth.controller');

router.get('/', function(req, res){
    res.send('Go to auth/login');
});

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;