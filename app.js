var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//SET UP OUR DATA URL AND CONNECT
var db = mongoose.connect('mongodb://127.0.0.1:27017/userAPI');
var User = require('./models/userModel');
var Event = require('./models/eventModel');


var app = express();
var port = process.env.PORT || 3000;

//NEED TO USE THE MIDDLEWARE USE to implement bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var userRouter = require('./Routes/userRoutes')(User);
app.use('/api/users', userRouter);

var eventRouter = require('./Routes/eventRoutes')(Event);
app.use('/api/events', eventRouter);

//create default route
app.get('/', function(req, res){
    res.send('Welcome to the Blood Donation API');
});

//listen on the port
app.listen(port, function(){
    console.log('Server Started on port ' + port);
});