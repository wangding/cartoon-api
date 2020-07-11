const env = process.env.NODE_ENV;

module.exports = {
  SECRET: 'Wi8_(ziT',
  ERR_PREFIX: '操作失败：',
  OK_MSG: '操作成功',
  isDev: env === 'development',
  isTest: env === 'testing',
  isProd: env === 'production'
}
