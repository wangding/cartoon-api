const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  msg_key: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '留言用户 ID，或受回复消息 ID'
  },
  type: {
    type: DataTypes.INTEGER(4),
    allowNull: false,
    comment: '留言类型：0 用户留言，1 是回复'
  },
  content: {
    type: DataTypes.TEXT
  }
};

module.exports = seq.define('message', attributes);
