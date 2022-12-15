const { Subscription } = require('egg');
const moment = require('moment');

class Day extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 30 9 * * ? ', // corn-parser  每天凌晨0点01分执行一次
      // *    *    *    *    *    *
      // ┬    ┬    ┬    ┬    ┬    ┬
      // │    │    │    │    │    |
      // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
      // │    │    │    │    └───── month (1 - 12)
      // │    │    │    └────────── day of month (1 - 31)
      // │    │    └─────────────── hour (0 - 23)
      // │    └──────────────────── minute (0 - 59)
      // └───────────────────────── second (0 - 59, optional)
      type: 'worker', // 使用一个worker进程
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // this.rank();
  }
  async rank() {
    const rank = await this.service.qw.getRank();
    const res = await this.service.qw.postTextMsg(['羽毛球群'], rank);
    this.ctx.logger.info('排行榜定时任务', { res });
  }
}

module.exports = Day;
