import {
  addAccessLog,
  addOperationLog,
} from 'app/middlewares/log/utils';

const saveLog = () => {
  return async (ctx, next) => {
    const method = ctx.request.method;
    let user = '';
    if (ctx.passport && ctx.passport.user) {
      user = ctx.passport.user;
    } else if (ctx.request.query.mail) {
      user = ctx.request.query.mail;
    } else if (ctx.request.body.mail) {
      user = ctx.request.body.mail;
    } else if (ctx.wxOpenid) {
      user = ctx.wxOpenid;
    }
    const url = ctx.originalUrl;
    const userAgent = ctx.request.header['user-agent'];
    const ip = ctx.request.get('X-Forwarded-For') ||
      ctx.request.get('X-Real-IP');
    let operationType = '';
    if (method === 'POST') {
      if (url === '/api/v1/authentication') {
        operationType = 'login';
      } else {
        operationType = 'add';
      }
    } else if (method === 'PUT') {
      operationType = 'edit';
    } else if (method === 'DELETE') {
      operationType = 'delete';
    }
    let index = url.indexOf('v1/');
    let api = url.substring(index + 3, url.length);
    index = api.indexOf('/');
    if (index !== -1) {
      api = api.substring(0, index);
    }
    if (method === 'GET') {
      const logParam = {
        user,
        url,
        userAgent,
        ip,
        api,
        inputParam: ctx.request.query,
        result: ctx.body,
      };
      await addAccessLog(logParam);
    } else {
      const logParam = {
        user,
        url,
        userAgent,
        ip,
        api,
        inputParam: ctx.req.body ? ctx.req.body : ctx.request.body,
        result: ctx.body,
        operationType,
      };
      await addOperationLog(logParam);
    }
    await next();
  };
};

export {
  saveLog,
};
