'use strict';

var Promise = require('bluebird');

var repo = function (db) {
    var getCityQuery = function (cityId) {
        var query = db('city')
            .join('country', 'country.country_id', '=', 'city.country_id');
        if (cityId) {
            query = query.where('city.city_id', '=', cityId);
        }
        return query.select(
            'city.city_id',
            'city.city',
            'country.country'
        );
    };
    var listCities = function (query, cityId) {
        if (cityId) {
            return getCityQuery(cityId).then();
        } else {
            return getCityQuery().then();
        }
    };

    var getCountryQuery = function (countryId) {
        var query = db('country');
        if (countryId) {
            query = query.where('country.country_id', '=', countryId);
        }
        return query.select(
            'country.country_id',
            'country.country'
        );
    };
    var listCountries = function (query, countryId) {
        if (countryId) {
            return getCountryQuery(countryId).then();
        } else {
            return getCountryQuery().then();
        }
    };

    var getClubTypeQuery = function (clubTypeId) {
        var query = db('clubtype');
        if (clubTypeId) {
            query = query.where('clubtype.clubtype_id', '=', clubTypeId);
        }
        return query.select(
            'clubtype.clubtype_id',
            'clubtype.clubtype'
        );
    };
    var listClubTypes = function (query, clubTypeId) {
        if (clubTypeId) {
            return getClubTypeQuery(clubTypeId).then();
        } else {
            return getClubTypeQuery().then();
        }
    };


    var getSexQuery = function (sexId) {
        var query = db('sex');
        if (sexId) {
            query = query.where('sex.sex_id', '=', sexId);
        }
        return query.select(
            'sex.sex_id',
            'sex.sex'
        );
    };
    var listUserSex = function (query, sexId) {
        if (sexId) {
            return getSexQuery(sexId).then();
        } else {
            return getSexQuery().then();
        }
    };

    var getBloodGroupQuery = function (bloodgroupId) {
        var query = db('bloodgroup');
        if (bloodgroupId) {
            query = query.where('bloodgroup.bloodgroup_id', '=', bloodgroupId);
        }
        return query.select(
            'bloodgroup.bloodgroup_id',
            'bloodgroup.bloodgroup'
        );
    };
    var listUserBloodGroup = function (query, bloodgroupId) {
        if (bloodgroupId) {
            return getBloodGroupQuery(bloodgroupId).then();
        } else {
            return getBloodGroupQuery().then();
        }
    };

    return {
        listCountries: listCountries,
        listCities: listCities,
        listClubTypes: listClubTypes,
        listUserBloodGroup: listUserBloodGroup,
        listUserSex: listUserSex
    };
};

module.exports = repo;
