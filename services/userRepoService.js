"use strict";

var Promise = require('bluebird');

var repo = function (db) {
    var listUsers = function (query, userId) {
        // var sex = query.sex || false;
        // var city = query.city || false;
        // var isActive = query.isactive || false;
        // var isAvailable = query.isavailable || false;
        // var bloodgroup = query.bloodgroup || false;

        if (userId) {
            return getUserQuery(userId).then()
        } else {
            return getUserQuery().then();

            // db('buser')
            //     .join('bloodgroup', 'buser.bloodgroup_id', '=', 'bloodgroup.bloodgroup_id')
            //     .join('sex', 'buser.sex_id', '=', 'sex.sex_id')
            //     .join('address', 'buser.address_id', '=', 'address.address_id')
            //     .join('city', 'address.city_id', '=', 'city.city_id')
            //     .join('country', 'city.gcountry_id', '=', 'country.country_id')
            //     .select('buser.user_id',
            //     'buser.first_name',
            //     'buser.last_name',
            //     'buser.email',
            //     'bloodgroup.bloodgroup',
            //     'buser.email',
            //     'sex.sex',
            //     'buser.is_active',
            //     'buser.is_available',
            //     'buser.note',
            //     'buser.profile_pic',
            //     'address.address as address:address1',
            //     'address.address2 as address:address2',
            //     'city.city as address:city',
            //     'country.country as address:country',
            //     'address.phone as address:phone',
            //     'address.postal_code as address:postal_code'
            //     )
            //     // .where("sex.sex",'Male')
            //     //.whereRaw("LOWER(sex.sex) = '%' || LOWER(?) || '%'", query.sex ||'')
            //     .then()
        }
    }

    var getUserQuery = function (userId) {
        var query = db('buser')
            .join('bloodgroup', 'buser.bloodgroup_id', '=', 'bloodgroup.bloodgroup_id')
            .join('sex', 'buser.sex_id', '=', 'sex.sex_id')
            .join('address', 'buser.address_id', '=', 'address.address_id')
            .join('city', 'address.city_id', '=', 'city.city_id')
            .join('country', 'city.country_id', '=', 'country.country_id');
        if (userId) {
            query = query.where('buser.user_id', '=', userId);
        }
        return query.select('buser.user_id',
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
    }
    var deleteUser = function (userId) {
        return db('buser')
            .where("user_id", userId)
            .del()
            .then();
    }

    var addUser = function (user) {
        var address = user.address;
        delete user.address;

        return db.transaction(function (trx) {
            return trx
                .insert(address, 'address_id')
                .into('address')
                .then(function (ids) {
                    return trx.insert(user, 'user_id')
                        .into('buser')
                        .then();
                })
        });
    }

    var patchUser = function (userId, user) {
        var address = user.address;
        var address_id = address.address_id;
        delete address.address_id;
        delete user.address;
        return db.transaction(function (trx) {
            return Promise.all([
                trx('address')
                    .where('address_id', address_id)
                    .update(address),
                trx('buser')
                    .where('user_id', userId)
                    .update(user)
            ]);
        });
    }

    return {
        listUsers: listUsers,
        addUser: addUser,
        patchUser: patchUser,
        deleteUser: deleteUser
    }
};

module.exports = repo;
