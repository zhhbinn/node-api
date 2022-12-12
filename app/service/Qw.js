const Service = require('egg').Service;
const mapKey = require('./QA');
const moment = require('moment');
const { Op } = require('sequelize');
const robot_id = 'b96aa3e43ff1422b9db0b601fd411d69';
module.exports = class Qw extends Service {
  async dealKey(key) {
    const res = await mapKey(this, key);
    return res;
  }
  async postTextMsg(targetName = ['测试'], content) {
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
    if (this.app.config.env === 'prod' || targetName[0] === '测试') {
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
  async getRank(type = 'timer') {
    const day = moment()
      .add(type === 'timer' ? -1 : 0, 'days')
      .format('YYYY-MM-DD');
    const range = [moment(`${day} 00:00:00`).unix(), moment(`${day} 23:59:59`).unix()];
    const res = await this.app.seqIns.qwGroupYmqq.count({
      where: {
        status: 1,
        created_time: {
          [Op.between]: range,
        },
      },
      attributes: ['user'],
      group: 'user',
    });
    res.sort((a, b) => b.count - a.count);
    const rank = res.map((i, idx) => `${idx + 1} - ${i.user}\n`).join('');

    const str = `『${type === 'timer' ? '昨日' : '实时'}排行榜』\n\n${rank}\n注：以上数据仅统计文字部分`;
    return str;
  }
};
