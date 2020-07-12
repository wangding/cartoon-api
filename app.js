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
const loadRouters = require('require-directory')

// error handler
//onerror(app)

app.use(catchEx)
app.use(cors({ origin: '*', methods: 'GET,PUT,POST,DELETE' }))
app.use(jwt({ secret: SECRET })
  .unless({ path: [/^\/api\/user\/login/]}))
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())

loadRouters(module, './routes', {visit: (r)=>{
  app.use(r.routes(), r.allowedMethods())
}})

// error-handling
/*
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
*/

module.exports = app
