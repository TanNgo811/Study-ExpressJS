const express = require('express')
var router = express.Router();

var db = require('../db');

var controller = require('../controller/users.controller');

var validate = require('../validate/users.validate');
// app.get('/users', function(req, res){
//     res.render('users/index',{
//         users: users
//     });
// });

router.get('/', controller.index);

// app.get('/users/search', function(req, res){
//     var q = req.query.q;
//     var matchedUser = users.filter(function(user){
//         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//     });
//     res.render('users/index',{
//         users: matchedUser
//     });
// });

router.get('/search', controller.search);

router.get('/create', controller.create);

// app.post('/users/create', function(req, res){
//     users.push(req.body);
    
//     console.log(req.body);
//     res.redirect('/users');
// });

router.get('/:id', controller.userPage);

router.post('/create', validate.postUserInfo, controller.postUserInfo);

module.exports = router;