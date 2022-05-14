const bbsService = require('../services/bbsService');

class BbsController {
  async setNewBlog(ctx) {

    const data = ctx.request.body;

    const result = await bbsService.setNewArticle(data)

    if (result) {
      ctx.body = {
        status: 200
      }
    }
  }

  async getArticleList(ctx) {
    const result = await bbsService.getArticleList()

    if (result.length) {
      ctx.body = {
        status: 200,
        result
      }
    } else {
      ctx.body = {
        status: 404,
        msg: 'no data!'
      }
    }
  }
  
  async getArticleDetail(ctx) {
    const id = ctx.params.id

    const result = await bbsService.getArticleDetail(id)

    ctx.body = {
      status: 200,
      result
    }
  }

  async searchArticle(ctx) {
    const { keyWords } = ctx.request.body

    const result = await bbsService.searchArticle(keyWords)

    if (result.length) {
      ctx.body = {
        status: 200,
        result
      }
    } else {
      ctx.body = { status: 404 }
    }
  }
}

module.exports = new BbsController();