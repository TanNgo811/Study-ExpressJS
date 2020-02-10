const express = require('express')
var router = express.Router();
const shortid = require('shortid');
var db = require('../db');

// app.get('/users', function(req, res){
//     res.render('users/index',{
//         users: users
//     });
// });

router.get('/', function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
});

// app.get('/users/search', function(req, res){
//     var q = req.query.q;
//     var matchedUser = users.filter(function(user){
//         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//     });
//     res.render('users/index',{
//         users: matchedUser
//     });
// });

router.get('/search', function(req, res){
    var q = req.query.q;
    var matchedUser = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchedUser
    });
});

router.get('/create', function(req, res){
    res.render('users/create');
});

// app.post('/users/create', function(req, res){
//     users.push(req.body);
    
//     console.log(req.body);
//     res.redirect('/users');
// });

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    
    var user = db.get('users').find({ id: id }).value();
    
    res.render('users/view', {
        user: user
    });

    res.status(404).send("Sorry can't find that!");
});

router.post('/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('users')
        .push(req.body)
        .write()
        // .then() => console.log("State has been saved")
    console.log(req.body);
    res.redirect('/users');
});

module.exports = router;