const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//csrf attack avoid
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var db = require('./db');

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-demo', {useNewUrlParser: true});

var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var authMiddleware = require('./middlewares/auth.middleware');

var sessionMiddleware = require('./middlewares/session.middleware');
require('dotenv').config();

// middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

// app.use(csrf({cookie: true})); // for csrf attack

app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index',{
        name: 'Welcome Back!'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => console.log(`Server listening on port ${port}!`));