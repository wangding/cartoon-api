const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

module.exports = seq.define('author_book', attributes);
