const validator = require('validator'),
      { ERR_PREFIX } = require('../conf/constant');

function validateLength(authorName, field) {
  let res = validator.isLength(authorName, {max: 255})

  if(!res) throw Error(`${ERR_PREFIX}${field}太长！`)
}

module.exports = { validateLength };
