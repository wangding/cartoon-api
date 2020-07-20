const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
};

module.exports = seq.define('tag', attributes);
