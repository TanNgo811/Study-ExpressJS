var db = require('../db');
const shortid = require('shortid');

var User = require('../models/user.model');

module.exports.index = function(req, res){
        // res.render('users/index',{
        //     users: db.get('users').value()
        // });


    User.find().then(function(users){
        res.render('users/index', {
            users: users
        });
    });
};

module.exports.search = function(req, res){
    // var q = req.query.q;
    // var matchedUser = db.get('users').value().filter(function(user){
    //     return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    // });
    // res.render('users/index',{
    //     users: matchedUser
    // });

    var q = req.query.q;
    var matchedUser = User.find().then(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index',{
        users: matchedUser
    });
};

module.exports.create = function(req, res){
    console.log(req.cookies);
    res.render('users/create');
};

module.exports.userPage = function(req, res, next){
    var id = req.params.id;
    // console.log(id);

    // User.findOne({_id : id}).then(function(user){
    //     res.render('users/view', {
    //         user: user
    //     });
    // });
    // console.log(User.find());

    var user = db.get('users').find({ id: id }).value();
    
    res.render('users/view', {
        user: user
    });

    res.status(404).send("Sorry can't find that!");
};

module.exports.postUserInfo = function(req, res){
    // var data = {
    //     // id:  shortid.generate(),
    //     avatar:  req.file.path.split('\\').slice(1).join('\\'),
    //     name: req.body.name,
    //     phone: req.body.phone
    // };
    var newUser = new User({
        avatar:  req.file.path.split('\\').slice(1).join('\\'),
        name: req.body.name,
        phone: req.body.phone
    });
    // req.body.id = shortid.generate();
    // req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
    // db.get('users')
    //     .push(req.body)
    //     .write()
    //     // .then() => console.log("State has been saved")
    // console.log(req.body);
    newUser.save(function(err, nUser){
        if (err) return console.error(err);
        console.log(nUser.name + " has been saved to DB");
    });
    res.redirect('/users');
};