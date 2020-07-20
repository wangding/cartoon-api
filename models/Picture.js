const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pic_order: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment: '图片顺序'
  }
};

module.exports = seq.define('picture', attributes);
