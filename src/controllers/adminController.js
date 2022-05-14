const adminService = require("../services/adminService");

class AdminController {
  async login(ctx) {

    const username = ctx.request.body.username,
          password = ctx.request.body.password

    const result = await adminService.login({ username, password })

    ctx.body = {
      result
    }
  }

  async getUserList(ctx) {
    const { page, pageSize } = ctx.request.body
    
    const result = await adminService.getUserList({ page, pageSize })

    ctx.body = {
      result
    }
  }

  async deleteUser(ctx) {
    const userId = ctx.params.id

    const result = await adminService.deleteUser(userId)

    ctx.body = { result }
  }

  async getBbsList(ctx) {
    const { page, pageSize } = ctx.request.body

    const result = await adminService.getBbsList({ page, pageSize })

    ctx.body = {
      result
    }
  }

  async deleteBbs(ctx) {
    const bbsId = ctx.params.id

    const result = await adminService.deleteBbs(bbsId)

    ctx.body = { result }
  }

  async getNewsList(ctx) {
    const { page, pageSize } = ctx.request.body

    const result = await adminService.getNewsList({ page, pageSize })

    ctx.body = {
      result
    }

  }

  async deleteNews(ctx) {
    const newsId = ctx.params.id

    const result = await adminService.deleteNews(newsId)

    ctx.body = { result }
  }

  async addNews(ctx) {
    const { conent, status } = ctx.request.body
    
    const result = await adminService.addNews(content, status);

    ctx.body = { result }
  }

  async getTopicList(ctx) {
    const { page, pageSize } = ctx.request.body

    const result = await adminService.getTopicList({ page, pageSize })

    ctx.body = {
      result
    }

  }

  async deleteTopic(ctx) {
    const topicId = ctx.params.id

    const result = await adminService.deleteTopic(topicId)

    ctx.body = { result }
  }

  async addTopic(ctx) {
    const data = ctx.request.body

    const result = await adminService.addTopic(data);
    if (result) {
      ctx.body = { result }
    }
  }
}

module.exports = new AdminController();