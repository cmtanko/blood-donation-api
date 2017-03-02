"use strict";

var cfg = require('./knex-cfg');
var knex = require('knex')(cfg.pg_prod);
console.log('db file loadded');
module.exports = knex;
