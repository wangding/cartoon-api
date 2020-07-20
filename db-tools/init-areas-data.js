#!/usr/bin/env node

const { Area } = require('../models');

async function initData() {
  await areaData();
}

async function areaData() {
  await Area.create({ area_name: '港台' });
  await Area.create({ area_name: '日韩' });
  await Area.create({ area_name: '大陆' });
  await Area.create({ area_name: '欧美' });
}

initData();
