const { Controller } = require('egg');
// const moment = require('moment');

module.exports = class QaController extends Controller {
  async callback() {
    const { ctx, service } = this;
    // spoken	是	你好啊	问题文本
    // rawSpoken	是	@me 你好啊	原始问题文本
    // receivedName	是	仑哥	提问者名称
    // groupName	是	测试群1	QA所在群名（群聊）
    // groupRemark	是	测试群1备注名	QA所在群备注名（群聊）
    // roomType	是	1	QA所在房间类型 1=外部群 2=外部联系人 3=内部群 4=内部联系人
    // atMe	是	true	是否@机器人（群聊）
    const { spoken, rawSpoken, receivedName, groupName, groupRemark, roomType, atMe } = ctx.request.body;

    ctx.logger.info('群聊QA触发', { spoken, rawSpoken, receivedName, groupName, groupRemark, roomType, atMe });

    const result = {
      code: 0,
      message: 'success',
      data: {
        type: 5000,
        info: {
          text: '',
        },
      },
    };

    const data = {
      socketType: 2,
      list: [
        {
          type: 203,
          titleList: ['羽毛球群'],
          receivedContent: '你好~',
        },
      ],
    };

    if (spoken === '你好') {
      service.utils.helper.requestBackend(
        'post',
        `https://worktool.asrtts.cn/wework/sendRawMessage?robotId=b96aa3e43ff1422b9db0b601fd411d69`,
        data,
        {
          'Content-Type': 'application/json',
        }
      );
    }
    ctx.body = result;
  }
};