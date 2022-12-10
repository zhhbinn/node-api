const Service = require('egg').Service;

const api_key = 'AFQP15jm0RMG1SSCgkLKober2mFJ5cGk';
module.exports =  class Taobao extends Service {
   async changeTKL(content) {
    const tmp = await this.service.utils.helper.requestBackend('POST', 'http://api.tbk.dingdanxia.com/tbk/wn_convert', {
      apikey: api_key,
      content,
      tpwd:true
    });
    const res = tmp?.data
    return res?.long_coupon_tpwd || res?.coupon_tpwd || res?.long_item_tpwd || res?.item_tpwd||res?.item_url||res?.coupon_click_url;
  }
}
