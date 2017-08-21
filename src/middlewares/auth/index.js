import passport from 'koa-passport';
import unless from 'koa-unless';
import { Strategy as LocalStrategy } from 'passport-local';

import redisClient from 'app/lib/redis';

passport.use();

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  const authenticateFn = passport.authenticate();
  authenticateFn.unless = unless;
  return authenticateFn;
};

export {
  initialize,
  authenticate,
};
