const dailyTestTable = require('../models/dailyTestTable');
const examRecordTable = require('../models/examRecordTable');

const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

class ExamService {
  async getExamTopic() {

    const topicList = await dailyTestTable.where()
      .projection({
        createdAt: 0,
        updatedAt: 0,
        serialNumber: 0
      })
      .limit(30)
      .find()

    return topicList
  }

  async setExamRecord(data) {
    
    data.totalNumber = data.records.length

    return await examRecordTable.save(data)
  }

  async getExamRecord(userId) {
    const result = await examRecordTable.where({ userId: userId })
      .projection({
        userId: 0,
        updatedAt: 0,
        records: 0
      })
      .sort({ createdAt: -1 })
      .find()

      return result
  }

  async getRecordDetails(recordId) {
    const result = await examRecordTable.where({ _id: ObjectId(recordId) })
      .projection({
        _id: 0,
        records: 1
      })
      .find()

    return result[0].records
  }
}

module.exports = new ExamService();