const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: '/exam'
});

const examController = require("../controllers/examController")

router.get("/lists", examController.getExamTopic)
router.post("/records", examController.setExamRecord)
router.get("/records/:id", examController.getExamRecord)
router.get("/details/:id", examController.getRecordDetails)

module.exports = router.routes()