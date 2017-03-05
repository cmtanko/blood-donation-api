exports.up = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('buser')
        .dropTableIfExists('address')
        .dropTableIfExists('city')
        .dropTableIfExists('country')
        .dropTableIfExists('club')
        .dropTableIfExists('clubtype')        
        .dropTableIfExists('bloodgroup')
        .dropTableIfExists('sex')
        .createTable('country', function (tbl) {
            tbl.integer('country_id').primary();
            tbl.string('country', 100).notNullable().unique();
            tbl.string('code', 5).notNullable().unique();
            tbl.date('last_update');
        })

        .createTable('city', function (tbl) {
            tbl.increments('city_id').primary();
            tbl.string('city', 50).notNullable();
            tbl.integer('country_id').notNullable().references('country_id').inTable('country');
            tbl.date('last_update');
        })

        .createTable('address', function (tbl) {
            tbl.increments('address_id').primary();
            tbl.string('address', 50).notNullable();
            tbl.string('address2', 50).notNullable();
            tbl.integer('city_id').notNullable().references('city_id').inTable('city');
            tbl.string('postal_code', 50);
            tbl.string('phone', 50).notNullable().unique();
            tbl.date('last_update');
        })

        .createTable('clubtype', function (tbl) {
            tbl.increments('clubtype_id').primary();
            tbl.string('clubtype', 100).notNullable().unique();
            tbl.date('last_update');
        })

        .createTable('club', function (tbl) {
            tbl.increments('club_id').primary();
            tbl.string('club', 50).notNullable().unique();
            tbl.integer('clubtype_id').notNullable().references('clubtype_id').inTable('clubtype');
            tbl.date('last_update');
        })
        .createTable('sex', function (tbl) {
            tbl.increments('sex_id').primary();
            tbl.string('sex', 15).notNullable().unique();
            tbl.date('last_update');
        })
        .createTable('bloodgroup', function (tbl) {
            tbl.increments('bloodgroup_id').primary();
            tbl.string('bloodgroup', 15).notNullable().unique();
            tbl.date('last_update');
        })
        .createTable('buser', function (tbl) {
            tbl.increments('user_id').primary();
            tbl.string('first_name', 30).notNullable();
            tbl.string('last_name', 30).notNullable();
            tbl.string('email', 60).notNullable().unique();

            tbl.integer('address_id').notNullable().references('address_id').inTable('address');
            tbl.integer('sex_id').notNullable().references('sex_id').inTable('sex');
            tbl.integer('club_id').references('club_id').inTable('club');
            tbl.integer('bloodgroup_id').notNullable().references('bloodgroup_id').inTable('bloodgroup');

            tbl.boolean('is_active').notNullable().defaultTo(false);
            tbl.boolean('is_available').notNullable().defaultTo(false);

            tbl.text('note');
            tbl.text('profile_pic');

            tbl.date('create_date');
            tbl.date('last_update');
        })



};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('country')
        .dropTableIfExists('city')
        .dropTableIfExists('address')
        .dropTableIfExists('club')
        .dropTableIfExists('clubtype')
        .dropTableIfExists('bloodgroup')
        .dropTableIfExists('sex')
        .dropTableIfExists('buser');
};
