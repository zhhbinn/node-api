// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRouterError from '../../../app/middleware/router_error';
import ExportWechat from '../../../app/middleware/wechat';

declare module 'egg' {
  interface IMiddleware {
    routerError: typeof ExportRouterError;
    wechat: typeof ExportWechat;
  }
}
