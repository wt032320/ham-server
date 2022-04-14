const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: '/topic'
});

const dailyTestController = require("../controllers/dailyTestController");

router.post("/add", dailyTestController.addTopic);

// Koa 的路由需要调用 routes 函数获取实际用于 use 的函数
module.exports = router.routes();
