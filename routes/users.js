const router = require('koa-router')()
const jwt = require('jsonwebtoken'),
      { SECRET } = require('../conf/constant'),
      util = require('util'),
      verify = util.promisify(jwt.verify)

router.prefix('/api/user')

router.get('/', function (ctx) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx) => {
  const {userName, password} = ctx.request.body
  console.log('userName:', userName)
  console.log('password:', password)

  let userInfo = null
  if(userName === 'wangding' && password === 'abc') {
    // 登录成功，获取用户信息
    userInfo = {
      id: 1,
      userName: 'wangding',
      nickName: '王顶',
      gender: 1
    }
  }

  // 加密 userInfo
  let token
  if(userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }

  if(userInfo === null) {
    ctx.body = { code: 40201, msg: '登录失败！' }
    return
  }

  ctx.body = { code: 0, msg: '', data: token }
})

// 获取用户信息
/*
router.get('/get-user-info', async (ctx) => {
  const token = ctx.header.authorization

  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = { code: 0, msg: '', data: payload }
  } catch (ex) {
    ctx.body = { code: -1, msg: 'verify token faild' }
  }
})
*/
module.exports = router
