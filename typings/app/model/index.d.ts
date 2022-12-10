// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/model/article');
import ExportComment = require('../../../app/model/comment');
import ExportGzhMsg = require('../../../app/model/gzh_msg');
import ExportHole = require('../../../app/model/hole');
import ExportInit = require('../../../app/model/init');

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Comment: ReturnType<typeof ExportComment>;
    GzhMsg: ReturnType<typeof ExportGzhMsg>;
    Hole: ReturnType<typeof ExportHole>;
    Init: ReturnType<typeof ExportInit>;
  }
}
