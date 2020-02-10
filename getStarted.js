const express = require('express')
const app = express()
const port = 3000

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', './views')


const bodyParser = require('body-parser')

// middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }) //users: keys
  .write()


// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function(req, res){
    res.render('index',{
        name: 'Alo'
    });
});

// var users = [
    
// ];

// app.get('/users', function(req, res){
//     res.render('users/index',{
//         users: users
//     });
// });

app.get('/users', function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
});

// app.get('/users/search', function(req, res){
//     var q = req.query.q;
//     var matchedUser = users.filter(function(user){
//         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//     });
//     res.render('users/index',{
//         users: matchedUser
//     });
// });

app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matchedUser = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchedUser
    });
});

app.get('/users/create', function(req, res){
    res.render('users/create');
});

// app.post('/users/create', function(req, res){
//     users.push(req.body);
    
//     console.log(req.body);
//     res.redirect('/users');
// });

app.post('/users/create', function(req, res){
    db.get('users')
        .push(req.body)
        .write()
        // .then() => console.log("State has been saved")
    console.log(req.body);
    res.redirect('/users');
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));