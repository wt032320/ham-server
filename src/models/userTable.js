const inspirecloud = require('@byteinspire/inspirecloud-api');

const userTable = inspirecloud.db.table('user');

module.exports = userTable;