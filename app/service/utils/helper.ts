import { Service } from 'egg';
import * as _ from 'lodash';
const moment = require('moment');
const path = require('path');
const formidable = require('formidable');
// const stream = require('stream');
// const OSS = require('ali-oss');
export default class Helper extends Service {
  public async dealIncludeObj(rows, includeKeys) {
    const resArr = _.map(rows, (item) => {
      let itemObj = {};
      let includeObj = {};
      _.map(item, (val, key) => {
        let keyIndex = _.findLastIndex(includeKeys, (v: any) => {
          return key.search(v) === 0;
        });
        if (keyIndex !== -1) {
          if (!includeObj[includeKeys[keyIndex]]) {
            includeObj[includeKeys[keyIndex]] = {};
          }
          includeObj[includeKeys[keyIndex]][key.split(`${includeKeys[keyIndex]}.`)[1]] = val;
        } else {
          itemObj[key] = val;
        }
        return false;
      });
      itemObj = Object.assign({}, itemObj, includeObj);
      return itemObj;
    });
    return resArr;
  }

  // 数组去重，arr为普通数组，obj_arr为对象数组
  public async deDuplication(type = 'arr', Arr, property) {
    if (type === 'arr') {
      return Array.from(new Set(Arr));
    } else {
      let tmp = {};
      let result: any = [];
      Arr.forEach((i: any) => {
        if (!tmp[i[property]]) {
          tmp[i[property]] = true;
          result.push(i);
        }
      });
      return result;
    }
  }

  // 数组删除某一项
  public async deArrayItem(arr, item) {
    let tmp = JSON.parse(JSON.stringify(arr));
    arr.forEach((i, index) => {
      if (i === item) {
        tmp.splice(index, 1);
      }
    });
    return tmp;
  }

  public async hasSameArrayItem(arr1, arr2, key = '') {
    let result;
    arr1.forEach((i) => {
      result = arr2.find((j) => {
        if (key) {
          return function () {
            if (i[key] === j[key]) {
              return i;
            }
          };
        } else {
          return i === j;
        }
      });
    });
    return result;
  }

  public async dealResponseData(data, errObj: any = {}) {
    return {
      code: !errObj?.code ? 1 : errObj.code,
      data: data ? data : '',
      msg: !errObj?.msg ? 'success' : errObj.msg,
    };
  }

  public async parseFormData(req: any) {
    let fileRes: any = await new Promise(async function (resolve, reject) {
      try {
        var form = new formidable.IncomingForm();
        //设置编辑
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = path.join(__dirname, `../upload/`);
        //保留后缀
        form.keepExtensions = true;
        //设置单文件大小限制
        form.maxFieldsSize = 10 * 1024 * 1024;
        let fileArr: any = [];
        let fileL = 0;
        let fileBuffer;
        let fileName = '';
        form.parse(req, (err, fields) => {
          if (err) {
            throw err;
          }
          resolve({
            fileName: fields.file_name || fileName || `file_${moment().unix()}`,
            fileBuffer,
            user_id: fields.user_id || '',
            user_name: fields.user_name || '',
            describe: fields.describe || '',
            type: fields.type || '',
            payment_id: fields.payment_id || '',
          });
        });

        form.onPart = function (part) {
          if (!part.filename) {
            form.handlePart(part);
          }
          part.addListener('data', function (d) {
            if (part.name !== 'file') {
              return;
            }
            if (d.length == 0) {
              return;
            }
            fileArr.push(d);
            fileL += d.length;
          });
          part.addListener('end', function () {
            if (part.name === 'file') {
              fileName = part.filename;
              fileBuffer = Buffer.concat(fileArr, fileL);
            }
          });
        };
      } catch (e) {
        reject(e);
      }
    });
    return fileRes;
  }

  public async sonsTree(arr, topId) {
    let topItem = _.filter(arr, (item) => item.pid === topId)[0];
    topItem = _.pick(topItem, 'id', 'name', 'type', 'action_key', 'pid', 'status');
    if (!topItem) {
      return [];
    }
    let _forFn = (arr, pItem) => {
      pItem.child = pItem.child ? pItem.child : [];
      for (let i = 0; i < arr.length; i++) {
        let item = _.pick(arr[i], 'id', 'name', 'type', 'action_key', 'pid', 'status');
        if (item.pid == pItem.id) {
          pItem.child.push(item);
          _forFn(arr, item);
        }
      }
    };
    _forFn(arr, topItem);
    return [topItem];
  }

  public async throwErr(name: string = 'CommonError', msg: string = '') {
    const err = new Error(msg);
    err.name = name;
    throw err;
  }

  public async requestBackend(method: string = 'get', url: string, data = {}, headers = {}) {
    const upMethod: any = method.toUpperCase();
    const result = await this.ctx.curl(url, {
      method: upMethod,
      data,
      dataType: 'json',
      headers,
    });
    if (result && result.status === 200 && result.data) {
      return Promise.resolve(result.data);
    } else {
      this.ctx.logger.error(
        `调用${method} - ${url} - 失败 - body:${JSON.stringify(data)} - 返回：${JSON.stringify(result)}`
      );
      let msg = result.data && result.data.msg ? result.data.msg : JSON.stringify(result.data);
      await this.ctx.service.utils.helper.throwErr('ProxyError', msg);
    }
  }

  // 随机字符串
  public async randomStr() {
    return Math.random().toString(36).slice(-8);
  }
}
