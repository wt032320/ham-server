const inspirecloud = require('@byteinspire/inspirecloud-api');

const bbsTable = inspirecloud.db.table('bbs_content');

module.exports = bbsTable;