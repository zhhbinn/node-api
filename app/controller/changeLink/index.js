
const { Controller } = require('egg');

module.exports =  class ChangeLinkController extends Controller {
  async taobao() {
    const { content } = this.ctx.request.body;
    const result =  await this.service.taobao.changeTKL(content)
    this.ctx.body = await this.service.utils.helper.dealResponseData(result);
  }

  async jd() {
    const { productUrl } = this.ctx.request.query;
    this.ctx.body = await this.service.taobao.getGoodsId(productUrl);
  }
}
