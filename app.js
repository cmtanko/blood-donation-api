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
        'methods': '[GET/POST]',
        'users': url + '/api/users/?sex=&city=&country=&bloodgroup=&active=&available=',
        'eg': {
            "first_name": "firstname",
            "last_name": "lastname",
            "email": "sdfdfdsd@gmail.com",
            "bloodgroup_id": 4,
            "sex_id": 2,
            "is_active": true,
            "is_available": false,
            "note": "",
            "profile_pic": "",
            "last_update": "2017-01-01",
            "create_date": "2017-01-01",
            "address": {
                "address": "new address",
                "address2": "patan",
                "city_id": 1,
                "phone": "9854895732",
                "postal_code": "00977",
                "last_update": "2017-04-03"
            }
        }
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

