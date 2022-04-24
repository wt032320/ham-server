const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: '/user'
});

const userInfoController = require('../controllers/userInfoController');

router.post('/infos', userInfoController.setUserInfo)
router.post('/collects', userInfoController.addCollectTopic)
router.post('/undock', userInfoController.removeCollectTopic)
router.post('/collects/wrong', userInfoController.addWrongTopic)
router.post('/undock/wrong', userInfoController.removeWrongTopic)
router.get('/collects/lists/:id', userInfoController.getCollectTopicList)
router.get('/wrong/lists/:id', userInfoController.getWrongTopicList)

// Koa 的路由需要调用 routes 函数获取实际用于 use 的函数
module.exports = router.routes();