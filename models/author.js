const { DataTypes } = require('sequelize'),
      seq           = require('../db-tools/seq');

const attributes = {
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

const options = {
  indexes: [{
    name: 'author_name',
    using: 'BTREE',
    fields: ['author_name']
  }]
};

module.exports = seq.define('author', attributes, options); 
