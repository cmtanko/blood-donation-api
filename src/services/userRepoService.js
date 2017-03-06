'use strict';

var Promise = require('bluebird');

var repo = function (db) {
    var getUserQuery = function (queryString, userId) {
        var bloodGroup = queryString.bloodgroup;
        var sex = queryString.sex;
        var country = queryString.country;
        var city = queryString.city;
        var active = queryString.active;
        var available = queryString.available;
        var firstName = queryString.firstname;
        var lastName = queryString.lastname;

        var query = db('buser')
            .join('bloodgroup', 'buser.bloodgroup_id', '=', 'bloodgroup.bloodgroup_id')
            .join('sex', 'buser.sex_id', '=', 'sex.sex_id')
            .join('address', 'buser.address_id', '=', 'address.address_id')
            .join('city', 'address.city_id', '=', 'city.city_id')
            .join('country', 'city.country_id', '=', 'country.country_id');
        if (userId) {
            query = query.where('buser.user_id', '=', userId);
        }
        query = query.select('buser.user_id',
            'buser.first_name',
            'buser.last_name',
            'buser.email',
            'bloodgroup.bloodgroup',
            'buser.email',
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
        );
        if (bloodGroup) {
            query = query.whereRaw('LOWER(bloodgroup.bloodgroup) = ?', bloodGroup.toLowerCase());
        }
        if (sex) {
            query = query.whereRaw('LOWER(sex.sex) = ?', sex.toLowerCase());
        }
        if (country) {
            query = query.whereRaw('LOWER(country.country) = ?', country.toLowerCase());
        }
        if (city) {
            query = query.whereRaw('LOWER(city.city) = ?', city.toLowerCase());
        }
        if (firstName) {
            query = query.whereRaw("LOWER(buser.first_name) LIKE  '%' || ? || '%'", firstName.toLowerCase());
        }
        if (lastName) {
            query = query.whereRaw("LOWER(buser.last_name) LIKE '%' || ? || '%'", lastName.toLowerCase());
        }
        if (active) {
            query = query.whereRaw('buser.is_active = ?', active);
        }
        if (available) {
            query = query.whereRaw('buser.is_available = ?', available);
        }
        return query;
    };
    var listUsers = function (query, userId) {
        if (userId) {
            return getUserQuery(query, userId).then();
        } else {
            return getUserQuery(query).then();
        }
    };


    var deleteUser = function (userId) {
        return db('buser')
            .where('user_id', userId)
            .del()
            .then();
    };

    var addUser = function (user) {
        var address = user.address;
        delete user.address;

        return db.transaction(function (trx) {
            return trx
                .insert(address, 'address_id')
                .into('address')
                .then(function (ids) {
                    user.address_id = ids[0];
                    return trx.insert(user, 'user_id')
                        .into('buser')
                        .then();
                });
        });
    };

    var patchUser = function (userId, user) {
        var address = user.address;
        var addressId = address.address_id;
        delete address.address_id;
        delete user.address;
        return db.transaction(function (trx) {
            return Promise.all([
                trx('address')
                    .where('address_id', addressId)
                    .update(address),
                trx('buser')
                    .where('user_id', userId)
                    .update(user)
            ]);
        });
    };

    return {
        listUsers: listUsers,
        addUser: addUser,
        patchUser: patchUser,
        deleteUser: deleteUser
    };
};

module.exports = repo;
