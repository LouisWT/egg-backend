import { a } from 'config';
import redisClient from 'app/lib/redis';
import { query } from 'app/lib/mysql';

export default (router) => {
  router.put('/', async (ctx, next) => {
    const { param } = ctx.request.body;
    console.log(`a = ${a}`);
    console.log(param);
    ctx.body = 'done';
    await next();
  });

  router.post('/', async (ctx, next) => {
    // authenticate('local');
    await redisClient.hsetAsync('key',
    'test keys 2', 'test val 6');
    const result = await redisClient.hmgetAsync('key', 'test keys 1', 'test keys 2');
    const { param } = ctx.request.query;
    console.log(result);
    console.log(result[0]);
    console.log(param);
    console.log(`a = ${a}`);
    ctx.body = 'done';
    await next();
  });

  router.get('/', async (ctx, next) => {
    const id = 2;
    // const name = '%许%';
    const sql = 'SELECT * FROM sys_account WHERE id =:id';
    const result = await query(sql, {
      id,
    });
    ctx.body = result;
    console.log(result);
    await next();
  });
};
