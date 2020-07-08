const { DataTypes } = require('sequelize'),
      seq           = require('../db-tools/seq');

const attributes = {
  area_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '地区名'
  }
};

module.exports = seq.define('area', attributes); 
