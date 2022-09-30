const wechat = require('co-wechat');
const moment = require('moment');

module.exports = (app) => {
  class ReplyController extends app.Controller {}
  ReplyController.prototype.wechat = wechat(
    {
      token: 'vpwmyvdn',
      appid: 'wx621b5c4b1e87975f',
      encodingAESKey: 'ISfamOMMXKLYY9czN5tqgx5uZPm51xU2pVJdjUNVmCN',
    },
    true
  ).middleware(async (message,ctx) => {
    const ask = message?.Content;
    let reply_content = await ctx.service.wxReply.handleReply(ask);
    reply_content = reply_content || '你好呀，你吃鱼吗';

    await app.seqIns.gzhMsg.create({
      from_user: message?.FromUserName || '-',
      msg_content: ask,
      msg_type: message?.MsgType,
      msg_time: message?.CreateTime,
      reply_content,
      status: 1,
      encrypt: message?.Encrypt,
      msg_id: message?.MsgId,
      created_time: moment().unix(),
    });

    return reply_content;
  });

  return ReplyController;
};

