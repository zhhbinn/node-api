// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportJD = require('../../../app/service/JD');
import ExportQA = require('../../../app/service/QA');
import ExportQw = require('../../../app/service/Qw');
import ExportTaobao = require('../../../app/service/Taobao');
import ExportTest = require('../../../app/service/Test');
import ExportWxReply = require('../../../app/service/WxReply');
import ExportUtilsHelper = require('../../../app/service/utils/helper');

declare module 'egg' {
  interface IService {
    jD: AutoInstanceType<typeof ExportJD>;
    qA: AutoInstanceType<typeof ExportQA>;
    qw: AutoInstanceType<typeof ExportQw>;
    taobao: AutoInstanceType<typeof ExportTaobao>;
    test: AutoInstanceType<typeof ExportTest>;
    wxReply: AutoInstanceType<typeof ExportWxReply>;
    utils: {
      helper: AutoInstanceType<typeof ExportUtilsHelper>;
    }
  }
}
