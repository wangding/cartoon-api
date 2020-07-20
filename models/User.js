const { DataTypes } = require('sequelize'),
      { seq }       = require('../lib/util');

const attributes = {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nick_name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  mobile: {
    type: DataTypes.CHAR(11),
    defaultValue: ''
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_login_time: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
};

module.exports = seq.define('user', attributes);
