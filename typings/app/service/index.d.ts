// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportJD from '../../../app/service/JD';
import ExportTaobao from '../../../app/service/Taobao';
import ExportTest from '../../../app/service/Test';
import ExportWxReply from '../../../app/service/WxReply';
import ExportUtilsHelper from '../../../app/service/utils/helper';

declare module 'egg' {
  interface IService {
    jD: AutoInstanceType<typeof ExportJD>;
    taobao: AutoInstanceType<typeof ExportTaobao>;
    test: AutoInstanceType<typeof ExportTest>;
    wxReply: AutoInstanceType<typeof ExportWxReply>;
    utils: {
      helper: AutoInstanceType<typeof ExportUtilsHelper>;
    }
  }
}
