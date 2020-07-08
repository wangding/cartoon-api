const router  = require('koa-router')(),
      DB_CONF = require('../conf/db'),
      author  = require('../models/author');

router.prefix('/api/author')

router.get('/', async (ctx) => {
  /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "limit" }]*/
  let { page, limit } = await ctx.query

  // page 的数据合法性校验，有待完善
  if(typeof page === 'undefined') page = 1

  //console.log('limit:', DB_CONF.pageLimit);
  //console.log('offset:', (page-1) * DB_CONF.pageLimit);
  const aus = await author.findAndCountAll({
    limit: DB_CONF.pageLimit,
    offset: (page-1) * DB_CONF.pageLimit
  });

  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    code: 0,
    msg: '',
    count: aus.count,
    data: aus.rows
  };
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params

  // id 的数据合法性校验
  await author.destroy({ where: {id: id}})
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    code: 0,
    msg: 'ok'
  };
});

router.post('/', async (ctx) => {
  const { authorName } = ctx.request.body

  const res = await author.findOne({
    where: { author_name: authorName }
  })

  if(res === null) {  // 没有找到
    await author.create({ author_name: authorName })
    ctx.body = { code: 0, msg: 'ok' }
    return
  }

  ctx.body = { code: 10, msg: 'user exist!' }
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params
  const { authorName } = ctx.request.body

  console.log('id:', id)
  console.log('authorName:', authorName)

  const res = await author.findOne({
    where: { id: id }
  })

  if(res === null) {  // 没有找到
    ctx.body = { code: 20, msg: 'not exist' }
    return
  }

  await author.update({ 
    author_name: authorName
  }, {
    where: { id: id }
  })

  ctx.body = { code: 0, msg: 'ok!' }
})


module.exports = router
