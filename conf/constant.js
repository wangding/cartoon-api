const env = process.env.NODE_ENV;

module.exports = {
  SECRET: 'Wi8_(ziT',
  isDev: env === 'development',
  isTest: env === 'testing',
  isProd: env === 'production',
  adminExpiresIn: '5h',
  userExpiresIn: '12h'
}
