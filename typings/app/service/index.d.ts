// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportQA = require('../../../app/service/QA');
import ExportJd = require('../../../app/service/jd');
import ExportQw = require('../../../app/service/qw');
import ExportTaobao = require('../../../app/service/taobao');
import ExportTest = require('../../../app/service/test');
import ExportWxReply = require('../../../app/service/wxReply');
import ExportUtilsHelper = require('../../../app/service/utils/helper');

declare module 'egg' {
  interface IService {
    qA: AutoInstanceType<typeof ExportQA>;
    jd: AutoInstanceType<typeof ExportJd>;
    qw: AutoInstanceType<typeof ExportQw>;
    taobao: AutoInstanceType<typeof ExportTaobao>;
    test: AutoInstanceType<typeof ExportTest>;
    wxReply: AutoInstanceType<typeof ExportWxReply>;
    utils: {
      helper: AutoInstanceType<typeof ExportUtilsHelper>;
    }
  }
}
