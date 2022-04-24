const inspirecloud = require('@byteinspire/inspirecloud-api');

const examRecordTable = inspirecloud.db.table('exam_record');

module.exports = examRecordTable;