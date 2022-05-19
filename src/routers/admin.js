const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: '/admin'
});

const adminController = require("../controllers/adminController");

router.post('/login', adminController.login);
router.post('/regist', adminController.regist);
router.post('/users', adminController.getUserList);
router.get('/remove/user/:id', adminController.deleteUser);
router.post('/bbs', adminController.getBbsList);
router.get('/remove/bbs/:id', adminController.deleteBbs);
router.post('/news', adminController.getNewsList);
router.get('/remove/news/:id', adminController.deleteNews);
router.post('/add/news', adminController.addNews);
router.post('/topics', adminController.getTopicList);
router.get('/remove/topic/:id', adminController.deleteTopic);
router.post('/add/topic', adminController.addTopic);
router.get('/statistical/age', adminController.statisticalAge);
router.get('/statistical/category', adminController.statisticalCategory);
router.get('/statistical/bbs/count', adminController.statisticalBbsCount);
router.get('/statistical/exam/count', adminController.sstatisticalExamCount);
router.get('/news/info', adminController.getNewsInfo);

module.exports = router.routes();