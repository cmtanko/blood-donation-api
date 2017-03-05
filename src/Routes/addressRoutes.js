var express = require('express');

var routes = function () {
    var addressRouter = express.Router();
    var addressController = require('../Controllers/addressController')();
    //default users routes
    addressRouter.route('/')
        .get(addressController.listOptions);
    addressRouter.route('/clubtypes')
        .get(addressController.getClubTypes);
    addressRouter.route('/cities')
        .get(addressController.getCities);
    addressRouter.route('/countries')
        .get(addressController.getCountries);
    addressRouter.route('/sex')
        .get(addressController.getUserSex);
    addressRouter.route('/bloodgroups')
        .get(addressController.getUserBloodGroup);

    // //CREATE CUSTOM MIDDLEWARE TO GET SINGLE USER DATA
    // userRouter.use('/:userId', function (req, res, next) {
    //     userController.checkUserById(req.params.userId, function (err, user) {
    //         if (err) {
    //             res.status(500).send(err);
    //         } else if (user) {
    //             req.user = user;
    //             next();
    //         } else {
    //             res.status(404).send('no user found');
    //         }
    //     });
    // });

    //individual user routes
    addressRouter.route('/cities/:cityId')
        .get(addressController.getCities);
    addressRouter.route('/countries/:countryId')
        .get(addressController.getCountries);
    addressRouter.route('/clubtypes/:clubTypeId')
        .get(addressController.getClubTypes);
    addressRouter.route('/sex/:sexId')
        .get(addressController.getUserSex);
    addressRouter.route('/bloodgroups/:bloodgroupId')
        .get(addressController.getUserBloodGroup);

    return addressRouter;
};

module.exports = routes;