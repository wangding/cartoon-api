const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户收藏的漫画 ID'
  }
};

module.exports = seq.define('user_book', attributes);
