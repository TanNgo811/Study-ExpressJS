const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var db = require('./db');

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views')

var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');

var sessionMiddleware = require('./middlewares/session.middleware');
require('dotenv').config();

// middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
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

app.listen(port, () => console.log(`Server listening on port ${port}!`));