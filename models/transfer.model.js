var mongoose = require('mongoose');

var transferSchema = new mongoose.Schema({
    amount: Number,
    account: String,
    userID: String
});// Khai bao field trong object - lam sach du lieu - Validate data

var Transfer = mongoose.model('transfer', transferSchema, 'transfers');

module.exports = Transfer;