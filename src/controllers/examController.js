const examService = require("../services/examService")

class ExamController {

  async getExamTopic(ctx) {

    const result = await examService.getExamTopic();

    ctx.body = {
      status: 200,
      result
    }
  }

  async setExamRecord(ctx) {

    const userId = ctx.request.body.userId,
      records = ctx.request.body.records,
      correctNumber = ctx.request.body.correctNumber,
      unfinishedNumber = ctx.request.body.unfinishedNumber,
      startedAt = ctx.request.body.startedAt
    
    const result = await examService.setExamRecord({ userId, records, correctNumber, unfinishedNumber, startedAt })

    if (result) {
      ctx.body = { status: 200 }
    }
  }

  async getExamRecord(ctx) {
    const userId = ctx.params.id

    const result = await examService.getExamRecord(userId)

    if (result.length === 0) {
      ctx.body = {
        status: 404,
        msg: 'no data!'
      }
    } else {
      ctx.body = {
        status: 200,
        result
      }
    }
  }

  async getRecordDetails(ctx) {
    const recordId = ctx.params.id

    const result = await examService.getRecordDetails(recordId)

    ctx.body = {
      statusCode: 200,
      result
    }
  }
}

module.exports = new ExamController()