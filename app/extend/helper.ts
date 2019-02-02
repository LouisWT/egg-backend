import * as _ from 'lodash';

/**
 * 用户无权限的响应
 */
const unauthRes = () => ({
  status: 401,
  body: 'Unauthorized',
});

/**
 * 服务器错误的响应
 */
const serverErrRes = () => ({
  status: 500,
  body: 'Something went wrong, please retry after a few minute',
});

export {
  unauthRes,
  serverErrRes,
};
