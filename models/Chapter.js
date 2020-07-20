const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  chapter_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '章节所属漫画 ID'
  },
  chapter_order: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment: '章节顺序'
  }
};

module.exports = seq.define('chapter', attributes);
