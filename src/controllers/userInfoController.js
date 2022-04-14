const userService = require("../services/userService");

class UserInfoController {

  async setUserInfo(ctx) {
    const { id, data } = ctx.request.body
    const result = await userService.setUserInfo(id, data)
    ctx.body = { result }
  }
};

module.exports = new UserInfoController();
