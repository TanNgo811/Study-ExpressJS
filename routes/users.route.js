const express = require('express')
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

var db = require('../db');

var controller = require('../controller/users.controller');

var validate = require('../validate/users.validate');

var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.index);

router.get('/cookie' ,function(req, res, next){
    res.cookie('user-id', 12345);
    res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.userPage);

router.post('/create',
    upload.single('avatar'),
    validate.postUserInfo,
    controller.postUserInfo
);

module.exports = router;