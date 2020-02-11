const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
var db = require('./db');

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views')

var userRouter = require('./routes/users.route');


// middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function(req, res){
    res.render('index',{
        name: 'Alo'
    });
});

// var users = [
    
// ];

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));