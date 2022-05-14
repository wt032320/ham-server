const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

const bbsTable = require('../models/bbsTable');

class BbsService {
  async setNewArticle(data) {

    return await bbsTable.save(data)
  }

  async getArticleList() {
    
    const result = await bbsTable.where()
    .projection({
      updatedAt: 0,
      articleContent: 0
    })
    .sort({ createdAt: -1 })
    .find()

    return result
  }

  async getArticleDetail(id) {
    const result = await bbsTable.where({ _id: ObjectId(id) })
    .projection({
      updatedAt: 0,
      pictureUrl: 0,
      _id: 0
    })
    .findOne()

    return result
  }

  async searchArticle(keyWords) {
    const result = await bbsTable.where()
    .projection({
      updatedAt: 0,
      articleContent: 0
    })
    .sort({ createdAt: -1 })
    .find()

    const searchResult = []
    result.forEach((item) => {
        const searchString = Object.values(item).join()
        if (searchString.includes(keyWords)) {
          searchResult.push(item)
        }
    });

    return searchResult
  }
}

module.exports = new BbsService();