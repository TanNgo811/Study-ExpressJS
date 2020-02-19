var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});// Khai bao field trong object - lam sach du lieu - Validate data

var Product = mongoose.model('product', productSchema, 'products');

module.exports = Product;