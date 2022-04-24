const dailyTestTable = require('../models/dailyTestTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
// 引入 inspirecloud.db 便于使用操作符
const db = inspirecloud.db;

class DailyTestService {

  async addTopic(data) {
    return await dailyTestTable.save(data);
  };

  async getTopicList(data) {
    const startIndex = data.startIndex
    const lists = await dailyTestTable.where({ serialNumber: db.gte(startIndex).lte(startIndex + 4) })
      .projection({
        createdAt: 0,
        updatedAt: 0
      })
      .sort({ serialNumber: 1 })
      .find();

    if (lists.length > 0) {
      return {
        lists
      }
    } else {
      return {
        msg: 'no data!'
      }
    }
    
  }
};

module.exports = new DailyTestService();
