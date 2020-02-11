var db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res){
        res.render('users/index',{
            users: db.get('users').value()
        });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUser = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchedUser
    });
};

module.exports.create = function(req, res){
    res.render('users/create');
};

module.exports.userPage = function(req, res, next){
    var id = req.params.id;
    
    var user = db.get('users').find({ id: id }).value();
    
    res.render('users/view', {
        user: user
    });

    res.status(404).send("Sorry can't find that!");
};

module.exports.postUserInfo = function(req, res){
    req.body.id = shortid.generate();
    
    var errors = [];
    if(!req.body.name){
        errors.push('Name is required!');
    }
    
    if(!req.body.phone){
        errors.push('Phone is required!');
    }

    if(errors.length > 0){ //falsy || truthy
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
        return ;
    }
    
    db.get('users')
        .push(req.body)
        .write()
        // .then() => console.log("State has been saved")
    console.log(req.body);
    res.redirect('/users');
};