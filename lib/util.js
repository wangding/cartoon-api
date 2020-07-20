const Sequelize = require('sequelize'),
      pinyin    = require('pinyin'),
      DB_CONF   = require('../conf/db');

/**
 * 得到中文拼音
 *
 * 例如：'王顶' => wang-ding
 *
 * @param {string} str 中文字符串
 * @returns {string} 返回的英文字符串，中文的拼音
 */
function getUniqID(str) {
  var rs = pinyin(str, { style: pinyin.STYLE_NORMAL })
  return rs.map((w) => w[0]).join('-')
}

/**
 * 路由器返回的数据结构
 */
class ResData {
  constructor() {
    this.code = 0;
    this.msg  = '操作成功';
    this.count= 0;
    this.data = '';
  }
}

/**
 * Sequelize ORM 对象，用来操作数据库
 */
const seq = new Sequelize(DB_CONF.database, DB_CONF.user, DB_CONF.pwd, DB_CONF);

module.exports = { getUniqID, ResData, seq };
