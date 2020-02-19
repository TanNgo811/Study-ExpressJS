var db = require('../db');

var shortid = require('shortid');

var Transfer = require('../models/transfer.model');
module.exports.create = function(req, res, next){
    // res.render('transfer/create', {
    //     csrfToken: req.csrfToken()
    // });
    res.render('transfer/create');
};

module.exports.postCreate = function(req, res, next){
    // var data = {
    //     id: shortid.generate(),
    //     amount: parseInt(req.body.amount),
    //     account: req.body.account,
    //     userID: req.signedCookies.userID
        
    // };
    // db.get('transfers').push(data).write();
    // res.redirect('/transfer/create');

    var newTransfer = new Transfer({
        amount:  parseInt(req.body.amount),
        account: req.body.account,
        userID: req.signedCookies.userID
    });
    
    newTransfer.save(function(err, nUser){
        if (err) return console.error(err);
        console.log(newTransfer.account + " has been transfered money to DB");
    });
    res.redirect('/transfer/create');
    
};