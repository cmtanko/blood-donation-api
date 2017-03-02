"use strict";

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//var uRepo = require('./services/userRepoService');

// console.log('Done');
// screen.clear();
// uRepo.listUsers().then(function (result) {
//     screen.write(result, "json");
// })
// .finally(function(){
//     db.destroy();
// });

// var query = knex('bloodgroup')
//     .join('buser', 'buser.bloodgroup_id', '=', 'bloodgroup.bloodgroup_id')
//     .select(
//         "bloodgroup.bloodgroup",
//         "buser.first_name as user:firstname",
//         "buser.last_name as user:lastname"
//     )
//     .then(function (rows) {
//         var tree = new Treeize;
//         tree.grow(rows);
//         var bloodgroups = tree.getData();
//         screen.write(bloodgroups, "json");
//     })
//     .catch(function (err) {
//         console.error("Opps " + err);
//     })
//     .finally(function () {
//         knex.destroy();
//     });

// knex.select('bloodgroup')
//     .from('bloodgroup')
//     //.limit(4)
//     .distinct()
//     //.join("bloodgroup")
//    // .orderBy('last_name', "desc")
//     //.where('first_name','!=', 'Prabin')
//     .then(function (rows) {
//         screen.write(rows, "json");
//     })
//     .catch(function (err) {
//         console.error("Opps " + err);
//     })
//     .finally(function () {
//         knex.destroy();
//     });
//SET UP OUR DATA URL AND CONNECT
//var db = mongoose.connect('mongodb://127.0.0.1:27017/userAPI');
//var db = mongoose.connect('mongodb://admin:admin@ds157509.mlab.com:57509/blood-donation');
//var conString = "postgres://postgres:password@localhost:5432/blood_donation";

//var client = new pg.Client(conString);
//client.connect();

// var User = require('./models/userModel');
// var Event = require('./models/eventModel');


// var query = client.query("SELECT * FROM bloodgroup");

// query.on('row', function (row) {
//     console.log(row);
// });

// query.on('end', function (row) {
//     client.end();
// });

var app = express();
var port = process.env.PORT || 3000;

//NEED TO USE THE MIDDLEWARE USE to implement bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userRouter = require('./Routes/userRoutes')();
app.use('/api/users', userRouter);

var eventRouter = require('./Routes/eventRoutes')();
app.use('/api/events', eventRouter);

//create default route
app.get('/', function (req, res) {
    res.send('Welcome to the Blood Donation API');
});

//listen on the port
app.listen(port, function () {
    console.log('Server Started on port ' + port);
});

