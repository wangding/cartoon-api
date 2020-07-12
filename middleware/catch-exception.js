const { isDev, isTest } = require('../conf/constant')

async function catchException(ctx, next) {
  try{
    await next();
  } catch(ex) {
    if(ex.originalError.name === 'TokenExpiredError') {
      ctx.body = { code: 40001, msg: '操作失败：令牌过期！' }
      return
    }

    ctx.body = { code: 500, msg: ex.message }

    if(isDev || isTest) throw ex;
  }
}

module.exports = catchException;
