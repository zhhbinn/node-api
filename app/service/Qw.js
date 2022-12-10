const Service = require('egg').Service;
const mapKey = require('./QA');

const robot_id = 'b96aa3e43ff1422b9db0b601fd411d69';
module.exports = class Qw extends Service {
  dealKey(key) {
    return mapKey(key);
  }
  postTextMsg(targetName = [], content) {
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

    service.utils.helper.requestBackend(
      'post',
      `https://worktool.asrtts.cn/wework/sendRawMessage?robotId=${robot_id}`,
      data,
      {
        'Content-Type': 'application/json',
      }
    );
  }
};
