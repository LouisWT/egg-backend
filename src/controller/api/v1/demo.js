import { a } from 'config';

export default (router) => {
  router.post('/', async (ctx, next) => {
    const { param } = ctx.request.body;
    console.log(`a = ${a}`);
    console.log(param);
    ctx.body = 'done';
    await next();
  });
  router.get('/', async (ctx, next) => {
    const { param } = ctx.request.query;
    console.log(param);
    console.log(`a = ${a}`);
    ctx.body = 'done';
    await next();
  });
};
