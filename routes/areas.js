/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "limit|arr" }]*/
const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      DB_CONF = require('../conf/db'),
      { Area }= require('../models'),
      { validateLength } = require('../lib/wd-validate'),
      { ERR_PREFIX, OK_MSG } = require('../conf/constant');

router.prefix('/api/areas')

router.get('/', async (ctx) => {
  let { page, limit } = ctx.query

  // page 的数据合法性校验，有待完善
  if(typeof page === 'undefined') page = 1

  const aus = await Area.findAndCountAll({
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

router.get('/:areaName', async (ctx) => {
  let { areaName } = ctx.params

  // areaName 的数据合法性校验，有待完善
  if(typeof areaName === 'undefined') return;

  const aus = await Area.findAndCountAll({
    where: { area_name: { [Op.substring]: areaName } }
  });

  if(aus.count === 0) {
    ctx.body = { code: 40201, msg: `${ERR_PREFIX}区域不存在！` };
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
  await Area.destroy({ where: { id: { [Op.in]: ids } } })

  ctx.body = { code: 0, msg: OK_MSG };
});

router.post('/', async (ctx) => {
  const { areaName } = ctx.request.body

  validateLength(areaName, '区域名')
  const [ arr, res ] = await Area.findOrCreate({
    where: { area_name: areaName }
  })

  if(res) {
    ctx.body = { code: 0, msg: OK_MSG }
    return
  }

  ctx.body = { code: 40202, msg: `${ERR_PREFIX}区域已存在！` }
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params
  const { areaName } = ctx.request.body

  validateLength(areaName, '区域名')
  const [us] = await Area.update({
    area_name: areaName
  }, { where: { id } })

  if(us === 0) {
    ctx.body = { code: 40201, msg: `${ERR_PREFIX}区域不存在！` }
    return
  }

  ctx.body = { code: 0, msg: OK_MSG }
})

module.exports = router
