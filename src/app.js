const path = require('path');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const koaJwt = require('koa-jwt');

const todoRouter = require('./routers/todo');
const authRouter = require('./routers/auth');
const dailyTestRouter = require('./routers/dailyTest');
const userRouter = require('./routers/user');
const examRouter = require('./routers/exam');
const bbsRouter = require('./routers/bbs');

const Koa = require('koa');
const jwt = require("jsonwebtoken");
const { secret } = require('./data/appSecret');
const app = new Koa();

// 为应用使用中间件
// 静态文件中间件
app.use(koaStatic(path.join(__dirname, '../public')));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(koaBody());

app.use(
  koaJwt({
    secret,
  }).unless({
    path: [/^\/login/, '/bbs/lists', /^\/bbs\/detail/]
  })
)

app.use((ctx, next) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          jwt.verify(token, secret, {
            complete: true
          });
        } catch (error) {
          //token过期 生成新的token
          // const newToken = jwt.sign(payload, secret, { expiresIn: '1h' });
          // //将新token放入Authorization中返回给前端
          // ctx.res.setHeader('Authorization', newToken);
        }
      }
    }
  }

  return next().catch(err => {
    console.log(err)
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body =
        'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
});   

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    ctx.status = err.status || 500;
    ctx.body = {error: err.message};
  }
});

// 为应用使用路由定义
// 使用待办事项业务路由
app.use(todoRouter);
app.use(authRouter);
app.use(dailyTestRouter);
app.use(userRouter);
app.use(examRouter);
app.use(bbsRouter);

module.exports = app;
