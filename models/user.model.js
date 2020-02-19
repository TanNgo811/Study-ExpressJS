var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String,
    avatar: String
});// Khai bao field trong object - lam sach du lieu - Validate data

var User = mongoose.model('user', userSchema, 'users');

module.exports = User;