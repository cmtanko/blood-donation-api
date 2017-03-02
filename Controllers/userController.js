var screen = require('../screen');
var db = require('../db');
var userRepoService = require('../services/userRepoService')(db);
var Treeize = require('treeize');

var userController = function () {

    var post = function (req, res) {
        // var user = new User(req.body);
        // user.save();
        // res.status(201).send(user);
    }

    var get = function (req, res) {
        console.log('to controller' + req.query);
        query = req.query;
        userRepoService.listUsers().then(function (rows) {
            screen.write(query, "json");
            var tree = new Treeize;
            tree.grow(rows);
            res.json(tree.getData());
        }).catch(function (err) {
            console.error("Opps " + err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });


        // User.find(query, function (err, users) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var returnUsers = [];
        //         users.forEach(function (element) {
        //             var newUser = element.toJSON();
        //             newUser.links = {};
        //             if (req.headers.host === "localhost:8000") {
        //                 newUser.links.self = "http://" + req.headers.host + '/api/users/' + newUser._id;
        //             } else {
        //                 newUser.links.self = "https://" + req.headers.host + '/api/users/' + newUser._id;
        //             }
        //             returnUsers.push(newUser);
        //         }, this);
        //         res.json(returnUsers);
        //     }
        // });
    }

    var getUserById = function (req, res) {
        res.json(req.user);
    }

    var putUser = function (req, res) {
        req.user.firstname = req.body.firstname;
        req.user.lastname = req.body.lastname;
        req.user.email = req.body.email;
        req.user.phone = req.body.phone;
        req.user.age = req.body.age;
        req.user.profilePic = req.body.profilePic;
        req.user.sex = req.body.sex;
        req.user.bloodGroup = req.body.bloodGroup;
        req.user.club = req.body.club;
        req.user.address = req.body.address;
        req.user.isAvailable = req.body.isAvailable;
        req.user.notes = req.body.notes;

        //SAVE NOW
        req.user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    }

    var patchUser = function (req, res) {
        //DO NOT UPDATE ID
        if (req.body._id) {
            delete req.body._id;
        }
        //COPY WHATEVER IS UPDATED
        for (var p in req.body) {
            req.user[p] = req.body[p];
        }
        req.user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    }

    deleteUser = function (req, res) {
        req.user.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    }

    return {
        get: get,
        post: post,
        getUserById: getUserById,
        putUser: putUser,
        patchUser: patchUser,
        deleteUser: deleteUser
    }
}

module.exports = userController;