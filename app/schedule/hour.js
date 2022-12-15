const { Subscription } = require('egg');
const moment = require('moment');

class Hour extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 15 * * * ?  ', // corn-parser  每天凌晨0点01分执行一次
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
    // this.every();
    // this.mask();
  }
  async every() {
    const h = moment().hours();
    let content = '';
    if ([10, 11, 12, 16, 17].includes(h)) {
      content = '够钟饮水啦';
    }
    if ([21].includes(h)) {
      content = '够钟打机啦';
    }
    if (content) {
      const res = await this.service.qw.postTextMsg(['羽毛球群'], content);
      this.ctx.logger.info('小时任务', { content, res });
    }
  }
  async mask() {
    const h = moment().hours();
    if (h === 15) {
      const res = await this.service.qw.postTextMsg(['羽毛球群'], '该换口罩咯');
      this.ctx.logger.info('口罩定时任务', { res });
    }
  }
}

module.exports = Hour;
