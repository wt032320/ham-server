const userTable = require('../models/userTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const jwt = require('jsonwebtoken');
const koaRequest = require('koa2-request');

const ObjectId = inspirecloud.db.ObjectId;

const { appSecret, APP_ID, secret } = require("../data/appSecret");

class AuthService {
  async login(data) {
    const code = data.code
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    let res = await koaRequest(url);
    let userSign = JSON.parse(res.body);

    const payload = { username: data.username, id: userSign.openid };
    const token = jwt.sign(payload, secret, { expiresIn: '10d' })
    
    const user = await userTable.where({userId: userSign.openid}).findOne();
    
    if (!user) {
      const userInfo = {
        userId: userSign.openid,
        userName: data.username,
        titleTag: 1,
      }
      await userTable.save(userInfo)

      const result = {
        token,
        userId: userSign.openid,
        username: data.username,
        titleTag: 1,
        email: undefined,
        phone: undefined,
        sign: undefined,
      }
      return result;
    } else {
      const result = {
        token,
        userId: user.userId,
        username: user.userName,
        email: user.email,
        phone: user.phone,
        sign: user.sign,
        titleTag: user.titleTag,
      }

      return result;
    }
  }
}

module.exports = new AuthService();
