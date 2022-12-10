
const { Service } = require('egg');

module.exports =  class WxReply extends Service {
  async handleReply(ask) {
    if (this.includeKeyStr(ask)) {
      return await this.service.taobao.changeTKL(ask);
    }
  }

   includeKeyStr(ask) {
    return (
      ask.indexOf('taobao') !== -1 ||
      ask.indexOf('淘宝') !== -1 ||
      ask.indexOf('tmall') !== -1 ||
      ask.indexOf('天猫') !== -1 ||
      ask.indexOf('tb') !== -1
    );
  }
}
