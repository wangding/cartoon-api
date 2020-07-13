#!/usr/bin/env node

/* eslint no-unused-vars: [
     "error", {
      "varsIgnorePattern": "area|author|book|tag"
   }]*/

const seq  = require('./seq'),
      area = require('../models/area'),
      book = require('../models/book'),
      tag  = require('../models/tag'),
      author = require('../models/author');

async function initDB() {
  await seq.sync({force: true});
  await seq.close();
} 

initDB();
