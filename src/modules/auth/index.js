import passport from 'koa-passport';
import {
  Strategy as LocalStrategy,
} from 'passport-local';
import redisClient from 'app/lib/redis';

passport.use(new LocalStrategy(async (username, password, done) => {
  console.log('here');
  if (username && password) {
    if (username === 'lwt' && password === '123') {
      console.log('2');
      done(null, username);
    } else {
      done(null, false);
    }
  } else {
    console.log('1');
    done(null, false);
  }
}));

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate;
};

export {
  initialize,
  authenticate,
};
