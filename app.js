const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
//const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')
const { SECRET } = require('./conf/constant')
const catchEx = require('./middleware/catch-exception')

const index = require('./routes/index')
const user = require('./routes/users')
const author = require('./routes/author')

// error handler
//onerror(app)

app.use(catchEx)
app.use(cors({ origin: '*', methods: 'GET,PUT,POST,DELETE' }))

app.use(jwt({
  secret: SECRET
}).unless({
  path: [/^\/api\/user\/login/, /^\/admin/]
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(author.routes(), author.allowedMethods(['GET', 'POST', 'PUT', 'DELETE']))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
