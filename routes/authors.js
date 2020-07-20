/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "arr" }]*/
const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      DB_CONF = require('../conf/db'),
      { Author, AuthorView } = require('../models'),
      { ResData } = require('../lib/util'),
      { validateLength } = require('../lib/wd-validate');

router.prefix('/api/authors');

router.get('/', async (ctx) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  // page 的数据合法性校验，有待完善
  if(typeof page === 'undefined') {
    page  = 1;
    limit = DB_CONF.pageLimit;
  }

  let aus = await AuthorView.findAndCountAll({
    limit:   Number(limit),
    offset:  (page-1) * limit,
    order:   ['id']
  });

  res.count = aus.count;
  res.data  = aus.rows;

  ctx.body =  res;
})

router.get('/:authorName', async (ctx) => {
  let { page, limit } = ctx.query,
      { authorName } = ctx.params,
      res = new ResData();

  // authorName 的数据合法性校验，有待完善
  if(typeof authorName === 'undefined') return;

  if(typeof page === 'undefined') {
    page  = 1;
    limit = DB_CONF.pageLimit;
  }

  let aus = await AuthorView.findAndCountAll({
    limit:  Number(limit),
    offset: (page-1) * limit,
    where:  { author_name: { [Op.substring]: authorName } },
    order:  ['id']
  });

  if(aus.count === 0) {
    res.code = 40101;
    res.msg  = '查找失败：作者不存在！';
  }

  res.count = aus.count;
  res.data  = aus.rows;

  ctx.body = res;
})

router.post('/', async (ctx) => {
  const { authorName } = ctx.request.body;
  let res = new ResData();

  validateLength(authorName, '作者名')
  const [ arr, re ] = await Author.findOrCreate({
    where: { author_name: authorName }
  });

  console.log(arr)
  console.log(re)
  if(!re) {
    res.code = 40102;
    res.msg  = '插入失败：作者已存在！';
  }

  ctx.body = res;
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params,
        { authorName } = ctx.request.body;
  let   res = new ResData();

  validateLength(authorName, '作者名')
  const [us] = await Author.update({
    author_name: authorName
  }, {
    where: { id }
  });

  if(us === 0) {
    res.code = 40103;
    res.msg  = '更新失败：作者不存在！';
  }

  ctx.body = res;
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params;
  let ids = id.split(','),
      res = new ResData();

  // id 的数据合法性校验，有待完善
  const num = await Author.destroy({ where: { id: ids } });

  if(num === 0) {
    res.code = 40104;
    res.msg  = '删除失败：作者不存在！';
  }

  ctx.body = res;
});

module.exports = router;
