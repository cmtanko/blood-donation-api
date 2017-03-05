'use strict';

var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

//NEED TO USE THE MIDDLEWARE USE to implement bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRouter = require('./src/Routes/userRoutes')();
app.use('/api/users', userRouter);

// var eventRouter = require('./src/Routes/eventRoutes')();
// app.use('/api/events', eventRouter);

//create default route
app.get('/', function (req, res) {
    res.send('Welcome to the Blood Donation API');
});

//listen on the port
app.listen(port, function () {
    console.log('Server Started on port ' + port);
});

