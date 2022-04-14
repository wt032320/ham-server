const inspirecloud = require('@byteinspire/inspirecloud-api');

const dailyTestTable = inspirecloud.db.table('daily_test');

module.exports = dailyTestTable;