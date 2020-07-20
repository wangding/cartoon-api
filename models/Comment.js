const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
};

module.exports = seq.define('comment', attributes);
