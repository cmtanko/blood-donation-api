var express = require('express');

var routes = function (User) {
    var userRouter = express.Router();

    //default users routes
    userRouter.route('/')
        .post(function (req, res) {
            var user = new User(req.body);
            user.save();
            res.status(201).send(user);
        })
        .get(function (req, res) {
            query = req.query;
            User.find(query, function (err, users) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(users);
                }
            });
        });

    //CREATE CUSTOM MIDDLEWARE TO GET SINGLE USER DATA
    userRouter.use('/:userId', function (req, res, next) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                res.status(500).send(err);
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send("no user found");
            }
        });
    });

    //individual user routes
    userRouter.route('/:userId')
        .get(function (req, res) {
            res.json(req.user);
        })
        .put(function (req, res) {
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
        })
        .patch(function (req, res) {
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
        })
        .delete(function (req, res) {
            req.user.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });
    return userRouter;
}

module.exports = routes;