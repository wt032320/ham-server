const bbsController = require('../controllers/bbsController');

const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: '/bbs'
});

router.post('/new', bbsController.setNewBlog);
router.get('/lists', bbsController.getArticleList);
router.get('/detail/:id', bbsController.getArticleDetail);

module.exports = router.routes();