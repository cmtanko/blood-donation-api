'use strict';

var cfg = require('./knexfile');
var knex = require('knex')(cfg.production);
module.exports = knex;
