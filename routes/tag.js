/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "limit|arr" }]*/
const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      DB_CONF = require('../conf/db'),
      tag    = require('../models/tag'),
      { validateLength } = require('../lib/wd-validate'),
      { ERR_PREFIX, OK_MSG } = require('../conf/constant');

router.prefix('/api/tags')

router.get('/', async (ctx) => {
  let { page, limit } = await ctx.query

  // page 的数据合法性校验，有待完善
  if(typeof page === 'undefined') page = 1

  const aus = await tag.findAndCountAll({
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

router.get('/:tagName', async (ctx) => {
  let { tagName } = await ctx.params

  // tagName 的数据合法性校验，有待完善
  if(typeof tagName === 'undefined') return;

  const aus = await tag.findAndCountAll({
    where: { tag_name: { [Op.substring]: tagName } }
  });

  if(aus.count === 0) {
    ctx.body = { code: 40301, msg: `${ERR_PREFIX}标签不存在！` };
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
  await tag.destroy({ where: { id: { [Op.in]: ids } } })

  ctx.body = { code: 0, msg: OK_MSG };
});

router.post('/', async (ctx) => {
  const { tagName } = ctx.request.body

  validateLength(tagName, '标签名')
  const [ arr, res ] = await tag.findOrCreate({
    where: { tag_name: tagName }
  })

  if(res) {
    ctx.body = { code: 0, msg: OK_MSG }
    return
  }

  ctx.body = { code: 40302, msg: `${ERR_PREFIX}标签已存在！` }
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params
  const { tagName } = ctx.request.body

  validateLength(tagName, '标签名')
  const [us] = await tag.update({
    tag_name: tagName
  }, { where: { id } })

  if(us === 0) {
    ctx.body = { code: 40301, msg: `${ERR_PREFIX}标签不存在！` }
    return
  }

  ctx.body = { code: 0, msg: OK_MSG }
})

module.exports = router
