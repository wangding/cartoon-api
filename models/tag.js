const { DataTypes } = require('sequelize'),
      seq           = require('../db-tools/seq');

const attributes = {
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '分类名'
  }
};

module.exports = seq.define('tag', attributes); 
