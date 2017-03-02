"use strict";

var Promise = require('bluebird');

var repo = function (db) {
    var listUsers = function () {
        return db('buser')
            .join('bloodgroup', 'buser.bloodgroup_id', '=', 'bloodgroup.bloodgroup_id')
            .join('sex', 'buser.sex_id', '=', 'sex.sex_id')
            .join('address', 'buser.address_id', '=', 'address.address_id')
            .join('city', 'address.city_id', '=', 'city.city_id')
            .join('country', 'city.country_id', '=', 'country.country_id')
            .select('buser.user_id as userid',
            'buser.first_name as firstname',
            'buser.last_name as lastname',
            'buser.email as email',
            'bloodgroup.bloodgroup as bloodgroup',
            'buser.email as email',
            'sex.sex as sex',
            'buser.is_active as active',
            'buser.is_available as available',
            'buser.note as notes',
            'buser.profile_pic as profilePic',
            'address.address as address:address1',
            'address.address2 as address:address2',
            'city.city as address:city',
            'country.country as address:country',
            'address.phone as address:phone',
            'address.postal_code as address:postal_code'
            )
            .then()
    }

    return {
        listUsers: listUsers
    }
};

module.exports = repo;
