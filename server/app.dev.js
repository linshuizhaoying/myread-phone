var app = require('koa')()
  // 导入中间件
var koa = require('koa-router')()
var logger = require('koa-logger')
var json = require('koa-json')
var jwt = require('koa-jwt') //JSON Web Token 在浏览器中使用JWT你需要将它存在LocalStorage或者SessionStorage中
var cors = require('kcors')
var fs = require('fs')

// const users = require('./routes/users')
var users = require('./api/users');
var books = require('./api/books');
var mailbox = require('./api/mailbox');
var db = require('./config/mongoose')()
db.on('error', console.error.bind(console, 'error: connect error!'))
db.once('open', function () {
  // 一次打开记录
  console.log('connect success!')
})


// global middlewares
// 加入解析post请求中body的中间件
app.use(require('koa-bodyparser')())
// 加入解析json的中间件
app.use(json())
// 加入log记录的中间件
app.use(logger())
app.use(cors())
//This lets downstream middleware make decisions based on whether ctx.user is set.
app.use(jwt({secret: 'shared-secret', passthrough: true}))

// 收到请求时，先执行这个generator方法
app.use(function *(next) {
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})


// routes definition

// koa.get("/*", function *() {
//   this.body = {status:'success',data:'test'};
// });
// 使路由生效
koa.use('/users',users.routes(),users.allowedMethods());
koa.use('/books',books.routes(),books.allowedMethods());
koa.use('/mailbox',mailbox.routes(),mailbox.allowedMethods());
koa.get("/*", function *() {
  this.body = {status:'error',data:'404'};
});
app.use(koa.routes())

app.on('error', function (err, ctx) {
  logger.error('server error', err, ctx)
})

module.exports = app
