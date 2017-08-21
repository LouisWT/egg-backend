import passport from 'koa-passport';
import unless from 'koa-unless';

import JwtStrategy from 'app/middlewares/auth/strategies/jwt';

passport.use('jwt', JwtStrategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  const authenticateFn = passport.authenticate('jwt', { session: false });
  authenticateFn.unless = unless;
  return authenticateFn;
};

export {
  initialize,
  authenticate,
};
