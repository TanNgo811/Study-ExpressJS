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

var authMiddleware = require('./middlewares/auth.middleware');

// middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('adsafsfsgregjfsusdufyhafuiawf'));

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index',{
        name: 'Welcome Back!'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Server listening on port ${port}!`));