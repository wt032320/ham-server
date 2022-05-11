const inspirecloud = require('@byteinspire/inspirecloud-api');

const adminTable = inspirecloud.db.table('admin');

module.exports = adminTable;