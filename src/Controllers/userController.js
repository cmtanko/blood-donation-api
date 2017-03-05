var screen = require('../screen');
var db = require('../../db');
var userRepoService = require('../services/userRepoService')(db);
var Treeize = require('treeize');

var userController = function () {
    var post = function (req, res) {
        var user = req.body;
        userRepoService.addUser(user).then(function (rows) {
            screen.write(rows, 'json');
            res.status(201).send(rows);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };

    var get = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var query = req.query;
        console.log(query);
        var userId = req.params.userId || undefined;
        userRepoService.listUsers(query, userId).then(function (rows) {
            screen.write(rows, 'json');
            var tree = new Treeize();
            tree.grow(rows);
            var users = tree.getData();
            if (!userId) {
                users.forEach(function (user) {
                    user.link = {
                        'user': url + '/api/users/' + user.user_id
                    };
                }, this);
            }
            res.json(users);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };
    var getUser = function (req, res) {
        get(req, res);
    };

    var checkUserById = function (userId, res) {
        userRepoService.listUsers(null, userId)
            .then(function (rows) {
                if (rows.length > 0) {
                    res(null, rows);
                } else {
                    res(null, null);
                }
            }).catch(function (err) {
                res(err);
            }).finally(function () {
                console.log('db destroyed');
            });
    };



    var patchUser = function (req, res) {
        //DO NOT UPDATE ID
        if (req.body.user_id) {
            delete req.body.user_id;
        }
        req.user = {};
        //COPY WHATEVER IS UPDATED
        for (var p in req.body) {
            if (req.body.hasOwnProperty(p)) {
                req.user[p] = req.body[p];
            }
        }

        userRepoService.patchUser(req.params.userId, req.user)
            .then(function (data) {
                res.json(req.user);
            })
            .catch(function (err) {
                res.status(500).send(err);
            }).finally(function () {
                console.log('db destroyed');
                //db.destroy();
            });
    };

    var putUser = function (req, res) {
        patchUser(req, res);
    };

    var deleteUser = function (req, res) {
        userRepoService.deleteUser(req.params.userId).then(function (data) {
            res.status(204).send('Removed');
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };


    return {
        get: get,
        post: post,
        checkUserById: checkUserById,
        getUser: getUser,
        putUser: putUser,
        patchUser: patchUser,
        deleteUser: deleteUser,
    };
};

module.exports = userController;