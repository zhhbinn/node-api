export default () => {
  return async function routerErrorHandler(ctx, next) {
    try {
      await next();
    } catch (e) {
      const { app } = ctx;
      console.error(e);
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', e, ctx);
      ctx.body = {
        code: e.code || 555,
        data: {},
        msg: e.msg || e.message || '系统繁忙，请稍后再试',
      };
    }
  };
};
