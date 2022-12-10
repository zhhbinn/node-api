
const { Controller } = require('egg');
const crypto = require('crypto'); 

module.exports =  class HomeController extends Controller {
  async getMsg() { 
    this.ctx.body = await this.app.seqIns.gzhMsg.findAll();
  }

  async index() {
    const query = this.ctx.request.query;
    const signature = query.signature;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const echostr = query.echostr;
    if (await this.check(timestamp, nonce, signature, 'vpwmyvdn')) {
      this.ctx.body = echostr;
    } else {
      this.ctx.body = 'It is not from weixin';
    }
  }

   async check(timestamp, nonce, signature, token) {
    const tmp = [token, timestamp, nonce].sort().join('');
    const currSign = crypto.createHash('sha1').update(tmp).digest('hex');
    return currSign === signature;
  }
}
