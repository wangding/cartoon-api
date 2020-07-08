#!/usr/bin/env node

/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "area|author" }]*/

const seq  = require('./seq'),
      area = require('../models/area'),
      author = require('../models/author');

async function initDB() {
  await seq.sync({force: true});
  await seq.close();
} 

initDB();
