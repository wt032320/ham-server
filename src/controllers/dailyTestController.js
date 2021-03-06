const dailyTestService = require("../services/dailyTestService");

class DailyTestController {

  async getTopicList(ctx) {
    const data = ctx.request.body;
    const result = await dailyTestService.getTopicList(data);
    if (result.lists) {
      ctx.body = { 
        status: 200,
        lists: result.lists
      }
    } else if (result.msg) {
      ctx.body = { 
        status: 404,
        lists: result.msg
      }
    }
  }
}

module.exports = new DailyTestController();