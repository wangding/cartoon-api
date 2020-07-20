const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  book_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

module.exports = seq.define('author_view', attributes);
