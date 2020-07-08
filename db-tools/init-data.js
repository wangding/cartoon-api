#!/usr/bin/env node

const seq  = require('./seq'),
      fs   = require('fs'),
      area = require('../models/area'),
      author = require('../models/author');

async function initData() {
  await areaData();
  await authorData();
  await seq.close();
}

async function areaData() {
  await area.create({ area_name: '中国' });
  await area.create({ area_name: '香港' });
  await area.create({ area_name: '台湾' });
  await area.create({ area_name: '日本' });
  await area.create({ area_name: '韩国' });
  await area.create({ area_name: '美国' });
}

async function authorData() {
  const data = fs.readFileSync('./author-name.md').toString('utf8');
  const authors = data.split('\n');

  for(var i=0; i<authors.length; i++) {
    if(authors[i] !== '') await author.create({ author_name: authors[i] });
  }
}

initData();
