import { Controller } from 'egg';

export default class ChangeLinkController extends Controller {
  public async taobao() {
    const { content } = this.ctx.request.body;
    const result =  await this.service.taobao.changeTKL(content)
    this.ctx.body = await this.service.utils.helper.dealResponseData(result);
  }

  public async jd() {
    const { productUrl } = this.ctx.request.query;
    this.ctx.body = await this.service.taobao.getGoodsId(productUrl);
  }
}
