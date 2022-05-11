const inspirecloud = require('@byteinspire/inspirecloud-api');

const newsTable = inspirecloud.db.table('news');

module.exports = newsTable;