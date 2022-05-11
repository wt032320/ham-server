const userTable = require('../models/userTable');
const dailyTestTable = require('../models/dailyTestTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');

const ObjectId = inspirecloud.db.ObjectId

class UserInfoService {
  async setUserInfo(id, data) {
    const user = await userTable.where({ userId: id }).findOne();
    if (!user) {
      const error = new Error(`user not found`);
      error.status = 404;
      throw error;
    }
    console.log(data)
    if (data.email !== '') {
      user.email = data.email
    }

    if (data.phone !== '') {
      user.phone = data.phone
    }

    if (data.sign !== '') {
      user.sign = data.sign
    }

    await userTable.save(user);
    
    const userInfo = await userTable.where({ userId: id }).findOne();

    const userData = {
      userId: userInfo.userId,
      username: userInfo.userName,
      email: userInfo.email,
      phone: userInfo.phone,
      sign: userInfo.sign,
      titleTag: userInfo.titleTag,
    }
    return { Status: 200, userData }
  }

  async addCollectTopic(userId, topicId) {
    const user = await userTable.where({ userId: userId }).findOne();

    let topicIdList = []
    if (user.collectTopicId == undefined) {
      topicIdList.push(topicId)
    } else {
      topicIdList = [...user.collectTopicId, topicId]
    }
    
    user.collectTopicId = topicIdList
    await userTable.save(user)

    return { success: 200 }
  }

  async removeCollectTopic(userId, topicId) {
    const user = await userTable.where({ userId: userId }).findOne();

    let topicList = []
    topicList = user.collectTopicId

    if (topicList.includes(topicId)) {
      topicList = topicList.filter(item => item !== topicId)
      user.collectTopicId = topicList

      await userTable.save(user)

      return { code: 200, msg: 'success!' }
    } else {
      return { code: 404, msg: 'no data!' }
    }
  }

  async addWrongTopic(userId, topicId) {
    const user = await userTable.where({ userId: userId }).findOne();

    let topicIdList = []
    if (user.wrongTopicId == undefined) {
      topicIdList.push(topicId)
    } else {
      topicIdList = [...user.wrongTopicId, topicId]
    }
    
    user.wrongTopicId = topicIdList
    await userTable.save(user)

    return { success: 200 }
  }

  async removeWrongTopic(userId, topicId) {
    const user = await userTable.where({ userId: userId }).findOne();

    let topicList = []
    topicList = user.wrongTopicId

    if (topicList.includes(topicId)) {
      topicList = topicList.filter(item => item !== topicId)
      user.wrongTopicId = topicList

      await userTable.save(user)

      return { code: 200, msg: 'success!' }
    } else {
      return { code: 404, msg: 'no data!' }
    }
  }

  async setTitleTag(data) {
    const userId = data.userId,
          titleTag = data.tag
    const user = await userTable.where({ userId: userId }).findOne()
    if (!user) {
      const error = new Error(`user not found`);
      error.status = 404;
      throw error;
    }

    if (titleTag !== 0) {
      user.titleTag = titleTag
    }

    await userTable.save(user);
    return { Status: 200 }
  }

  async getCollectTopicList(userId) {
    const result = await userTable.where({ userId: userId })
    .projection({
      _id: 0,
      collectTopicId: 1
    })
    .findOne()
    
    console.log(result.collectTopicId)
    const idList = result.collectTopicId

    if (idList == undefined) {
      return { code: 404, msg: 'no data' }
    } else {
      let topicLists = []
      for (let item of idList) {
        topicLists.push(await dailyTestTable.where({ _id: ObjectId(item) })
        .projection({
          createdAt: 0,
          updatedAt: 0,
          serialNumber: 0,
          type: 0
        })
        .findOne())
      }
      return { code: 200, topicLists }
    }
  }

  async getWrongTopicList(userId) {
    const result = await userTable.where({ userId: userId })
    .projection({
      _id: 0,
      wrongTopicId: 1
    })
    .findOne()
    const idList = result.wrongTopicId
    if (idList == undefined) {
      return { code: 404, msg: 'no data' }
    } else {
      let topicLists = []
      for (let item of idList) {
        topicLists.push(await dailyTestTable.where({ _id: ObjectId(item) })
        .projection({
          createdAt: 0,
          updatedAt: 0,
          serialNumber: 0,
          type: 0
        })
        .findOne())
      }

      return { code: 200, topicLists }
    }
  }
}

module.exports = new UserInfoService();