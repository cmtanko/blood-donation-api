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

var addressRouter = require('./src/Routes/addressRoutes')();
app.use('/api/formdata', addressRouter);

// var eventRouter = require('./src/Routes/eventRoutes')();
// app.use('/api/events', eventRouter);

//create default route
app.get('/', function (req, res) {
    var url = req.protocol + '://' + req.get('host');
    var options = {};
    options.users = {
        'users': url + '/api/users/'
    };
    options.formdata = {
        'sex': url + '/api/formdata/sex/',
        'bloodgroups': url + '/api/formdata/bloodgroups/',
        'clubtypes': url + '/api/formdata/clubtypes/',
        'cities': url + '/api/formdata/cities/',
        'countries': url + '/api/formdata/countries/',
    };
    res.json(options);
});

//listen on the port
app.listen(port, function () {
    console.log('Server Started on port ' + port);
});

