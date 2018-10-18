var screen = require('../screen');
var db = require('../../db');
var addressRepoService = require('../services/addressRepoService')(db);
var Treeize = require('treeize');

var addressController = function () {
    var getCities = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var query = req.query;
        console.log(query);
        var cityId = req.params.cityId || undefined;
        addressRepoService.listCities(query, cityId).then(function (rows) {
            screen.write(rows, 'json');
            var tree = new Treeize();
            tree.grow(rows);
            var cities = tree.getData();
            if (!cityId) {
                cities.forEach(function (city) {
                    city.link = {
                        'city': url + '/api/formdata/cities/' + city.city_id
                    };
                }, this);
            }
            res.json(cities);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };

    var getCountries = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var query = req.query;
        console.log(query);
        var countryId = req.params.countryId || undefined;
        addressRepoService.listCountries(query, countryId).then(function (rows) {
            screen.write(rows, 'json');
            var tree = new Treeize();
            tree.grow(rows);
            var countries = tree.getData();
            if (!countryId) {
                countries.forEach(function (country) {
                    country.link = {
                        'country': url + '/api/formdata/countries/' + country.country_id
                    };
                }, this);
            }
            res.json(countries);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };

    var getClubTypes = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var query = req.query;
        console.log(query);
        var clubTypeId = req.params.clubTypeId || undefined;
        addressRepoService.listClubTypes(query, clubTypeId).then(function (rows) {
            screen.write(rows, 'json');
            var tree = new Treeize();
            tree.grow(rows);
            var clubTypes = tree.getData();
            if (!clubTypeId) {
                clubTypes.forEach(function (type) {
                    type.link = {
                        'clubtype': url + '/api/formdata/clubtypes/' + type.clubtype_id
                    };
                }, this);
            }
            res.json(clubTypes);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };

    var listOptions = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var options = {};

        options.link = {
            'countries': url + '/api/formdata/countries/',
            'cities': url + '/api/formdata/cities/',
            'clubtypes': url + '/api/formdata/clubtypes/'
        };
        res.json(options);
    };


    var getUserSex = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var query = req.query;
        var sexId = req.params.sexId || undefined;
        addressRepoService.listUserSex(query, sexId).then(function (rows) {
            screen.write(rows, 'json');
            var tree = new Treeize();
            tree.grow(rows);
            var sexs = tree.getData();
            if (!sexId) {
                sexs.forEach(function (s) {
                    s.link = {
                        'sex': url + '/api/sex/' + s.sex_id
                    };
                }, this);
            }
            res.json(sexs);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };

    var getUserBloodGroup = function (req, res) {
        var url = req.protocol + '://' + req.get('host');
        var query = req.query;
        var sexId = req.params.bloodgroupId || undefined;
        addressRepoService.listUserBloodGroup(query, sexId).then(function (rows) {
            screen.write(rows, 'json');
            var tree = new Treeize();
            tree.grow(rows);
            var sexs = tree.getData();
            if (!sexId) {
                sexs.forEach(function (s) {
                    s.link = {
                        'bloodgroup': url + '/api/bloodgroups/' + s.bloodgroup_id
                    };
                }, this);
            }
            res.json(sexs);
        }).catch(function (err) {
            res.status(500).send(err);
        }).finally(function () {
            console.log('db destroyed');
            //db.destroy();
        });
    };

    return {
        getCities: getCities,
        getCountries: getCountries,
        getClubTypes: getClubTypes,
        listOptions: listOptions,
        getUserSex: getUserSex,
        getUserBloodGroup: getUserBloodGroup
    };
};

module.exports = addressController;