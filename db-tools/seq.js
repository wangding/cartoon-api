#!/usr/bin/env node

const Sequelize = require('sequelize'),
      DB_CONF   = require('../conf/db');

const seq = new Sequelize(DB_CONF.database, DB_CONF.user, DB_CONF.pwd, DB_CONF);

module.exports = seq;
