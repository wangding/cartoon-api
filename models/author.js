const { DataTypes } = require('sequelize'),
      seq           = require('../db-tools/seq');

const attributes = {
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
};

module.exports = seq.define('author', attributes);
