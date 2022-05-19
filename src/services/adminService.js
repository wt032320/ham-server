const inspirecloud = require('@byteinspire/inspirecloud-api');
const jwt = require('jsonwebtoken');
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

const adminTable = require('../models/adminTable');

const { formatTime } = require('../util/util');
const { secret } = require("../data/appSecret");
const userTable = require('../models/userTable');
const bbsTable = require("../models/bbsTable");
const newsTable = require("../models/newsTable");
const dailyTestTable = require('../models/dailyTestTable');
const examTable = require('../models/examRecordTable');
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

  async regist(data) {

    const result = await adminTable.where({ username: data.username }).findOne()
    if (result == null) {
      await adminTable.save(data)
      return { status: 200 }
    } else {
      return { status: 400 }
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

  async statisticalAge() {
    const result = await userTable.where()
    .projection({ age: 1, _id: 0 })
    .find()

    const statisticalResult = {
      "11-20岁": 0,
      "21-30岁": 0,
      "31-40岁": 0,
      "41-50岁": 0,
      "51-60岁": 0
    }

    result.forEach((item) => {
      if (item.age >= 11 && item.age <= 20) {
        statisticalResult["11-20岁"]++
      } else if (item.age >= 21 && item.age <= 30) {
        statisticalResult["21-30岁"]++
      } else if (item.age >= 31 && item.age <= 40) {
        statisticalResult["31-40岁"]++
      } else if (item.age >= 41 && item.age <= 50) {
        statisticalResult["41-50岁"]++
      } else if (item.age >= 51 && item.age <= 60) {
        statisticalResult["51-60岁"]++
      }
    });

    const data = []
    for (let item in statisticalResult) {
      data.push({ value: statisticalResult[item], name: item })
    }

    return data
  }

  async statisticalCategory() {
    const result = await bbsTable.where()
    .projection({ category: 1, _id: 0 })
    .find()

    const statisticalResult = {
      "学习交流": 0,
      "心得体会": 0,
      "知识分享": 0,
      "新闻事件": 0,
    }

    result.forEach((item) => {
      if (item.category === "学习交流") {
        statisticalResult["学习交流"]++
      } else if (item.category === "心得体会") {
        statisticalResult["心得体会"]++
      } else if (item.category === "知识分享") {
        statisticalResult["知识分享"]++
      } else if (item.category === "新闻事件") {
        statisticalResult["新闻事件"]++
      }
    });

    const data = []
    for (let item in statisticalResult) {
      data.push({ value: statisticalResult[item], name: item })
    }

    return data
  }

  async statisticalBbsCount() {
     // 当前时间
    const now = new Date();
    // 24 小时之前
    const nowDay = new Date(new Date().toLocaleDateString())

    const countNow = await bbsTable.where({ createdAt: db.gt(nowDay).lte(now) })
    .count();

    const oneDay = new Date(nowDay - 24 * 60 * 60 * 1000);

    const countOne = await bbsTable.where({ createdAt: db.gt(oneDay).lte(nowDay) })
    .count();

    const twoDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 2);

    const countTwo = await bbsTable.where({ createdAt: db.gt(twoDay).lte(oneDay) })
    .count();

    const threeDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 3);

    const countThree = await bbsTable.where({ createdAt: db.gt(threeDay).lte(twoDay) })
    .count();

    const fourDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 4);

    const countFour = await bbsTable.where({ createdAt: db.gt(fourDay).lte(threeDay) })
    .count();

    const fiveDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 5);

    const countFive = await bbsTable.where({ createdAt: db.gt(fiveDay).lte(fourDay) })
    .count();

    const sixDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 6);

    const countSix = await bbsTable.where({ createdAt: db.gt(sixDay).lte(fiveDay) })
    .count();

    const data = [
      { action: formatTime(nowDay), addCount: countNow },
      { action: formatTime(oneDay), addCount: countOne },
      { action: formatTime(twoDay), addCount: countTwo },
      { action: formatTime(threeDay), addCount: countThree },
      { action: formatTime(fourDay), addCount: countFour },
      { action: formatTime(fiveDay), addCount: countFive },
      { action: formatTime(sixDay), addCount: countSix },
    ]
    return data
  }

  async statisticalExamCount() {
     // 当前时间
    const now = new Date();

    const nowDay = new Date(new Date().toLocaleDateString())

    const countNow = await examTable.where({ createdAt: db.gt(nowDay).lte(now) })
    .count();

    const oneDay = new Date(nowDay - 24 * 60 * 60 * 1000);

    const countOne = await examTable.where({ createdAt: db.gt(oneDay).lte(nowDay) })
    .count();

    const twoDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 2);

    const countTwo = await examTable.where({ createdAt: db.gt(twoDay).lte(oneDay) })
    .count();

    const threeDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 3);

    const countThree = await examTable.where({ createdAt: db.gt(threeDay).lte(twoDay) })
    .count();

    const fourDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 4);

    const countFour = await examTable.where({ createdAt: db.gt(fourDay).lte(threeDay) })
    .count();

    const fiveDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 5);

    const countFive = await examTable.where({ createdAt: db.gt(fiveDay).lte(fourDay) })
    .count();

    const sixDay = new Date(nowDay - 24 * 60 * 60 * 1000 * 6);

    const countSix = await examTable.where({ createdAt: db.gt(sixDay).lte(fiveDay) })
    .count();

    const time = [
      formatTime(nowDay),
      formatTime(oneDay),
      formatTime(twoDay),
      formatTime(threeDay),
      formatTime(fourDay),
      formatTime(fiveDay),
      formatTime(sixDay),
    ]

    const addCount = [countNow, countOne, countTwo, countThree, countFour, countFive, countSix]

    return { time, addCount }
  }

  async getNewsInfo() {
     // 当前时间
    const now = new Date();

    const nowDay = new Date(new Date().toLocaleDateString())

    const result = await newsTable.where({ createdAt: db.gt(nowDay).lte(now) })
    .projection({ content: 1, _id: 0 })
    .find()

    return result
  }
}

module.exports = new AdminService();