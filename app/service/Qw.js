const Service = require('egg').Service;
const mapKey = require('./QA');
const moment = require('moment');
const { Op } = require('sequelize');
const robot_id = 'b96aa3e43ff1422b9db0b601fd411d69';
module.exports = class Qw extends Service {
  dealKey(key) {
    return mapKey(key);
  }
  async postTextMsg(targetName = [], content) {
    const { service } = this;

    const data = {
      socketType: 2,
      list: [
        {
          type: 203,
          titleList: targetName,
          receivedContent: content,
        },
      ],
    };
    if (this.app.config.env === 'prod') {
      return await service.utils.helper.requestBackend(
        'post',
        `https://worktool.asrtts.cn/wework/sendRawMessage?robotId=${robot_id}`,
        data,
        {
          'Content-Type': 'application/json',
        }
      );
    }
  }

  async insertChat(user, content, at_me) {
    return await this.app.seqIns.qwGroupYmqq.create({
      user,
      content,
      at_me: at_me ? 1 : 0,
      status: 1,
      created_time: moment().unix(),
    });
  }
  async getRank() {
    const range = [moment().startOf('day').unix(), moment().endOf('day').unix()];
    return await this.app.seqIns.qwGroupYmqq.count({
      where: {
        status: 1,
        created_time: {
          [Op.between]: range,
        },
      },
      attributes: ['user'],
      group: 'user',
    });
  }
};
