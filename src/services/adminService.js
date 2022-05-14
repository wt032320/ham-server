const inspirecloud = require('@byteinspire/inspirecloud-api');
const jwt = require('jsonwebtoken');
const ObjectId = inspirecloud.db.ObjectId;

const adminTable = require('../models/adminTable');

const { secret } = require("../data/appSecret");
const userTable = require('../models/userTable');
const bbsTable = require("../models/bbsTable");
const newsTable = require("../models/newsTable");
const dailyTestTable = require('../models/dailyTestTable');

class AdminService {
  async login(data) {

    const payload = { username: data.username, password: data.password };

    const token = jwt.sign(payload, secret, { expiresIn: '10d' })

    const admin = await adminTable.where({ username: data.username }).findOne();

    if (admin !== null && admin.password === data.password) {
      return {
        code: 200,
        token
      }
    } else {
      return {
        code: 400,
        msg: '用户名或密码错误！'
      }
    }
  }

  async getUserList(data) {

    const result = await userTable.where()
      .projection({
        updatedAt: 0,
        _id: 0,
        titleTag: 0,
        collectTopicId: 0,
        wrongTopicId: 0
      })
      .skip((data.page - 1) * 10)
      .limit(data.pageSize)
      .find()

    const totalCount = await userTable.where().count()

    if (result.length === 0) {
      return {
        code: 404,
        msg: 'no data!'
      }
    } else {
      return {
        code: 200,
        result,
        page: data.page,
        pageCount: Math.ceil(totalCount / 10)
      }
    }
  }

  async deleteUser(userId) {
    
    const user = await userTable.where({ userId: userId }).find()

    const result = await userTable.delete(user)

    if (result.deletedCount === 1) {
      return { code: 200 }
    } else if (result.deletedCount === 0) {
      return { code: 404 }
    }
  }

  async getBbsList(data) {
    const result = await bbsTable.where()
      .projection({
        updatedAt: 0,
        paragraph: 0,
        articleContent: 0,
        pictureUrl: 0
      })
      .skip((data.page - 1) * 10)
      .limit(data.pageSize)
      .sort({ createdAt: -1 })
      .find()

    const totalCount = await bbsTable.where().count()

    if (result.length === 0) {
      return {
        code: 404,
        msg: 'no data!'
      }
    } else {
      return {
        code: 200,
        result,
        page: data.page,
        pageCount: Math.ceil(totalCount / 10)
      }
    }
  }

  async deleteBbs(bbsId) {
    const bbs = await bbsTable.where({ _id: ObjectId(bbsId) }).find()

    const result = await bbsTable.delete(bbs)

    if (result.deletedCount === 1) {
      return { code: 200 }
    } else if (result.deletedCount === 0) {
      return { code: 404 }
    }
  }

  async getNewsList(data) {
    const result = await newsTable.where()
      .projection({
        updatedAt: 0,
      })
      .skip((data.page - 1) * 10)
      .limit(data.pageSize)
      .sort({ createdAt: -1 })
      .find()
    
    const totalCount = await newsTable.where().count()

    if (result.length === 0) {
      return {
        code: 404,
        msg: 'no data!'
      }
    } else {
      return {
        code: 200,
        result,
        page: data.page,
        pageCount: Math.ceil(totalCount / 10)
      }
    }
  }

  async deleteNews(newsId) {
    const news = await newsTable.where({ _id: ObjectId(newsId) }).find()

    const result = await newsTable.delete(news)

    if (result.deletedCount === 1) {
      return { code: 200 }
    } else if (result.deletedCount === 0) {
      return { code: 404 }
    }
  }

  async addNews(content, status) {
    const oneNews = { content, status }

    await newsTable.save(oneNews);

    return { Status: 200 }
  }

  async getTopicList(data) {
    const result = await dailyTestTable.where()
      .projection({
        updatedAt: 0,
        options: 0,
        correctOption: 0,
        serialNumber: 0,
      })
      .skip((data.page - 1) * 10)
      .limit(data.pageSize)
      .sort({ createdAt: -1 })
      .find()
    
    const totalCount = await dailyTestTable.where().count()

    if (result.length === 0) {
      return {
        code: 404,
        msg: 'no data!'
      }
    } else {
      return {
        code: 200,
        result,
        page: data.page,
        pageCount: Math.ceil(totalCount / 10)
      }
    }
  }

  async deleteTopic(topicId) {
    const topic = await dailyTestTable.where({ _id: ObjectId(topicId) }).find()

    const result = await dailyTestTable.delete(topic)

    if (result.deletedCount === 1) {
      return { code: 200 }
    } else if (result.deletedCount === 0) {
      return { code: 404 }
    }
  }

  async addTopic(data) {
    await dailyTestTable.save(data);

    return { Status: 200 }
  }

}

module.exports = new AdminService();