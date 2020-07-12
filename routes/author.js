/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "limit|arr" }]*/
const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      DB_CONF = require('../conf/db'),
      author    = require('../models/author'),
      { validateLength } = require('../lib/wd-validate'),
      { ERR_PREFIX, OK_MSG } = require('../conf/constant');

router.prefix('/api/authors')

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
    msg: OK_MSG,
    count: aus.count,
    data: aus.rows
  };
})

router.get('/:authorName', async (ctx) => {
  let { authorName } = await ctx.params

  // authorName 的数据合法性校验，有待完善
  if(typeof authorName === 'undefined') return;

  const aus = await author.findAndCountAll({
    where: { author_name: { [Op.substring]: authorName } }
  });

  if(aus.count === 0) {
    ctx.body = { code: 40101, msg: `${ERR_PREFIX}作者不存在！` };
    return;
  }

  ctx.body = {
    code: 0,
    msg: OK_MSG,
    count: aus.count,
    data: aus.rows
  };
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params
  let ids = id.split(',')

  // id 的数据合法性校验，有待完善
  await author.destroy({ where: { id: { [Op.in]: ids } } })

  ctx.body = { code: 0, msg: OK_MSG };
});

router.post('/', async (ctx) => {
  const { authorName } = ctx.request.body

  validateLength(authorName, '作者名')
  const [ arr, res ] = await author.findOrCreate({
    where: { author_name: authorName }
  })

  if(res) {
    ctx.body = { code: 0, msg: OK_MSG }
    return
  }

  ctx.body = { code: 40102, msg: `${ERR_PREFIX}作者已存在！` }
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params
  const { authorName } = ctx.request.body

  validateLength(authorName, '作者名')
  const [us] = await author.update({
    author_name: authorName
  }, { where: { id } })

  if(us === 0) {
    ctx.body = { code: 40101, msg: `${ERR_PREFIX}作者不存在！` }
    return
  }

  ctx.body = { code: 0, msg: OK_MSG }
})

module.exports = router
