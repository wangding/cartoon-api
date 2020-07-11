const { isDev, isTest } = require('../conf/constant')

async function catchException(ctx, next) {
  try{
    await next();
  } catch(ex) {
    ctx.body = { code: 500, msg: ex.message }

    if(isDev || isTest) throw ex;
  }
}

module.exports = catchException;
