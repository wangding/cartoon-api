/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "limit|arr" }]*/
const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      DB_CONF = require('../conf/db'),
      author  = require('../models/author');

router.prefix('/api/author')

router.get('/', async (ctx) => {
  let { page, limit } = await ctx.query

  // page 的数据合法性校验，有待完善
  if(typeof page === 'undefined') page = 1

  const aus = await author.findAndCountAll({
    limit: DB_CONF.pageLimit,
    offset: (page-1) * DB_CONF.pageLimit
  });

  ctx.body = {
    code: 0,
    msg: '',
    count: aus.count,
    data: aus.rows
  };
})

router.get('/:authorName', async (ctx) => {
  let { authorName } = await ctx.params

  console.log('authorName:', authorName)

  // authorName 的数据合法性校验，有待完善
  if(typeof authorName === 'undefined') return;

  const aus = await author.findAndCountAll({
    where: { author_name: { [Op.substring]: authorName } }
  });

  console.log('aus:', aus)

  if(aus.count === 0) {
    ctx.body = { code: 40101, msg: '作者不存在！' };
    return;
  }

  ctx.body = {
    code: 0,
    msg: '',
    count: aus.count,
    data: aus.rows
  };
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params
  let ids = id.split(',')

  console.log(ctx.header)
  // id 的数据合法性校验，有待完善

  await author.destroy({ where: { id: { [Op.in]: ids } } })

  ctx.body = { code: 0, msg: '操作成功' };
});

router.post('/', async (ctx) => {
  const { authorName } = ctx.request.body

  const [ arr, res ] = await author.findOrCreate({
    where: { author_name: authorName }
  })
   
  if(res) {
    ctx.body = { code: 0, msg: '操作成功' } 
    return
  }

  ctx.body = { code: 40102, msg: '作者已存在！' }
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params
  const { authorName } = ctx.request.body

  const [us] = await author.update({ 
    author_name: authorName
  }, { where: { id } })

  if(us === 0) {
    ctx.body = { code: 40101, msg: '作者不存在！' }
    return
  }

  ctx.body = { code: 0, msg: '操作成功' }
})

module.exports = router
