// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportComment from '../../../app/model/comment';
import ExportGzhMsg from '../../../app/model/gzh_msg';
import ExportHole from '../../../app/model/hole';
import ExportInit from '../../../app/model/init';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Comment: ReturnType<typeof ExportComment>;
    GzhMsg: ReturnType<typeof ExportGzhMsg>;
    Hole: ReturnType<typeof ExportHole>;
    Init: ReturnType<typeof ExportInit>;
  }
}
