const dailyTestTable = require('../models/dailyTestTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const jwt = require('jsonwebtoken');

class DailyTestService {

  async addTopic(data) {
    return await dailyTestTable.save(data);
  };
};

module.exports = new DailyTestService();
