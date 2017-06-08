import passport from 'koa-passport';
import {
  Strategy as LocalStrategy,
} from 'passport-local';

passport.use(new LocalStrategy(async (username, password, done) => {

}));

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate('local', {
    session: false,
  });
};

export {
  initialize,
  authenticate,
};
