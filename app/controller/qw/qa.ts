import { Controller } from 'egg';
// const moment = require('moment');

export default class QaController extends Controller {
  public async callback() {
    const { ctx, service } = this;
  // spoken	是	你好啊	问题文本
  // rawSpoken	是	@me 你好啊	原始问题文本
  // receivedName	是	仑哥	提问者名称
  // groupName	是	测试群1	QA所在群名（群聊）
  // groupRemark	是	测试群1备注名	QA所在群备注名（群聊）
  // roomType	是	1	QA所在房间类型 1=外部群 2=外部联系人 3=内部群 4=内部联系人
  // atMe	是	true	是否@机器人（群聊）
    const {spoken, rawSpoken,receivedName,groupName,groupRemark,roomType,atMe } = ctx.request.body


    console.log(spoken, rawSpoken,receivedName,groupName,groupRemark,roomType,atMe)

    const result = {
      "code": 0,
      "message": "success",
      "data": {
          "type": 5000,
          "info": {
              "text": "你也好啊"
          }
      }
  }

    ctx.body = service.utils.helper.dealResponseData(result)
    


  }
}
