'use strict';

var cfg = require('./knex-cfg');
var knex = require('knex')(cfg.pg_dev);
console.log('db file loadded');
module.exports = knex;
