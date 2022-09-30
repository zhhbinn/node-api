import { Controller } from 'egg';
const { Op } = require('sequelize');
// const moment = require('moment');

export default class ArticleController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const { article_id } = ctx.request.body;
    const result = await this.app.seqIns.article.findOne({
      where: {
        [Op.or]: [
          {
            id: article_id,
          },
          {
            customize_id: article_id,
          },
        ],
      },
    });

    ctx.body = await service.utils.helper.dealResponseData(result);
  }
  public async list() {
    const { ctx, service } = this;
    const result = await this.app.seqIns.article.findAll({
      attributes: ['title', 'customize_id', 'tag_str', 'created_time'],
      where: {
        status: 1,
        show: 1,
      },
      order: [['created_time', 'desc']],
    });

    ctx.body = await service.utils.helper.dealResponseData(result);
  }
}
