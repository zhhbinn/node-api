// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportBlogArticle from '../../../app/controller/blog/article';
import ExportBlogComment from '../../../app/controller/blog/comment';
import ExportChangeLinkIndex from '../../../app/controller/changeLink/index';
import ExportWechatReply from '../../../app/controller/wechat/reply';
import ExportWechatVerify from '../../../app/controller/wechat/verify';

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
    wechat: {
      reply: ExportWechatReply;
      verify: ExportWechatVerify;
    }
  }
}