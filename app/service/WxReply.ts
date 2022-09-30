import { Service } from 'egg';

export default class WxReply extends Service {
  public async handleReply(ask) {
    if (this.includeKeyStr(ask)) {
      return await this.service.taobao.changeTKL(ask);
    }
  }

  private includeKeyStr(ask) {
    return (
      ask.indexOf('taobao') !== -1 ||
      ask.indexOf('淘宝') !== -1 ||
      ask.indexOf('tmall') !== -1 ||
      ask.indexOf('天猫') !== -1 ||
      ask.indexOf('tb') !== -1
    );
  }
}
