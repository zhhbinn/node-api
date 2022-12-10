// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportBlogArticle = require('../../../app/controller/blog/article');
import ExportBlogComment = require('../../../app/controller/blog/comment');
import ExportChangeLinkIndex = require('../../../app/controller/changeLink/index');
import ExportQwQa = require('../../../app/controller/qw/qa');
import ExportWechatReply = require('../../../app/controller/wechat/reply');
import ExportWechatVerify = require('../../../app/controller/wechat/verify');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    blog: {
      article: ExportBlogArticle;
      comment: ExportBlogComment;
    }
    changeLink: {
      index: ExportChangeLinkIndex;
    }
    qw: {
      qa: ExportQwQa;
    }
    wechat: {
      reply: ExportWechatReply;
      verify: ExportWechatVerify;
    }
  }
}
