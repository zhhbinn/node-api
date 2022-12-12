module.exports = (app) => {
  const { controller, router } = app;
  router.post('/hp/add_comment', controller.blog.comment.addComment);

  router.get('/api/get_msg', controller.home.getMsg);

  router.get('/wechat', controller.wechat.verify.index);
  router.post('/wechat', controller.wechat.reply.wechat);

  router.post('/c/tb', controller.changeLink.index.taobao);

  router.post('/hp/article_detail', controller.blog.article.index);
  router.get('/hp/article_list', controller.blog.article.list);

  router.post('/qw/qa', controller.qw.qa.callback);
  router.post('/qw/rank', controller.qw.qa.getRank);
};
