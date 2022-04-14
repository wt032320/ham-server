const userTable = require('../models/userTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');

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
    return { Status: 200 }
  }
}

module.exports = new UserInfoService();