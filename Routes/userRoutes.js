var express = require('express');

var routes = function () {
    var userRouter = express.Router();
    var userController = require('../Controllers/userController')();
    //default users routes
    userRouter.route('/')
        .post(userController.post)
        .get(userController.get);

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
        .get(userController.getUserById)
        .put(userController.putUser)
        .patch(userController.patchUser)
        .delete(userController.deleteUser);
    return userRouter;
}

module.exports = routes;