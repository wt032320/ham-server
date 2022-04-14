const dailyTestService = require("../services/dailyTestService");

class DailyTestController {
  async addTopic(ctx) {
    const data = ctx.request.body;
    const result = await dailyTestService.addTopic(data);
    if (result) {
      ctx.body = { status: 200 }
    }
  }

  
}

module.exports = new DailyTestController();