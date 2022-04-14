const authService = require("../services/authService");

class AuthController {
  async login(ctx) {
    const data = ctx.request.body
    const result = await authService.login(data)
    ctx.body = { result }
  }
};

module.exports = new AuthController();