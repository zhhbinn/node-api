import { Controller } from 'egg';
const moment = require('moment');

export default class CommentController extends Controller {
  public async addComment() {
    const { ctx, service } = this;
    const { name, email, content, article_id } = ctx.request.body;
    await this.app.seqIns.comment.create({
      name,
      email,
      content,
      article_id,
      is_show: 0,
      status: 1,
      created_time: moment().unix(),
    });

    ctx.body = await service.utils.helper.dealResponseData({ result: '操作成功' });
  }
}
