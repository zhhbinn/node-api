const { Subscription } = require('egg');
const moment = require('moment');

class Hour extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 * * * ?  ', // corn-parser  每天凌晨0点01分执行一次
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
    this.drink();
    this.mask();
  }
  async drink() {
    const h = moment().hours();
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(h)) {
      const res = await this.service.qw.postTextMsg(['羽毛球群'], '够钟饮水啦');
      this.ctx.logger.info('饮水定时任务', { res });
    }
  }
  async mask() {
    const h = moment().hours();
    if (h === 15) {
      const res = await this.service.qw.postTextMsg(
        ['羽毛球群'],
        '一次性医用口罩有效期一般为4小时。如果佩戴一个口罩的时间过长，人体呼出的湿气会导致口罩内面潮湿，对细菌和病毒的过滤效果将大大降低，所以你该换口罩了。'
      );
      this.ctx.logger.info('口罩定时任务', { res });
    }
  }
}

module.exports = Hour;
