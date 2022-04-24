const userService = require("../services/userService");

class UserInfoController {

  async setUserInfo(ctx) {
    const { id, data } = ctx.request.body
    const result = await userService.setUserInfo(id, data)
    ctx.body = { result }
  }

  async addCollectTopic(ctx) {
    const { userId, topicId } = ctx.request.body
    const result = await userService.addCollectTopic(userId, topicId)

    ctx.body = { status: result.success }
  }

  async removeCollectTopic(ctx) {
    const { userId, topicId } = ctx.request.body
    const result = await userService.removeCollectTopic(userId, topicId)

    ctx.body = { status: result.code, msg: result.msg }
  }

  async addWrongTopic(ctx) {
    const { userId, topicId } = ctx.request.body
    const result = await userService.addWrongTopic(userId, topicId)

    ctx.body = { status: result.success }
  }

  async removeWrongTopic(ctx) {
    const { userId, topicId } = ctx.request.body
    const result = await userService.removeWrongTopic(userId, topicId)

    ctx.body = { status: result.code, msg: result.msg }
  }

  async getCollectTopicList(ctx) {
    const userId = ctx.params.id
    const result = await userService.getCollectTopicList(userId)

    ctx.body = {
      result
    }
  }

  async getWrongTopicList(ctx) {
    const userId = ctx.params.id
    const result = await userService.getWrongTopicList(userId)

    ctx.body = {
      result
    }
  }
};

module.exports = new UserInfoController();
