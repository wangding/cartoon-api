async function catchException(ctx, next) {
  try{
    await next();
  } catch(ex) {
    // env === ?
    
    // if dev and test throw(ex)
    
    // if prod
    ctx.body = { code: 500, msg: 'ERROR: ' + ex.message }
  }
}

module.exports = catchException;
