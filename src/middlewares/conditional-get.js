module.exports = async (ctx, next) => {
  await next();
  if (ctx.fresh) {
    ctx.status = 304;
    ctx.body = null;
  }
};
