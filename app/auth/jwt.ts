import { EggApplication } from 'egg';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
} from 'passport-jwt';

/**
 * JwtStrategy 中的 doVerify 实际上会调用这个函数
 * @param ctx koa ctx
 * @param user user object in JwtStrategy
 */
const verify = async (ctx, user) => {
  const { id, provider } = user;
  const token = await ctx.service.token.getToken({
    accountId: id,
    userAgent: provider,
  });
  if (token && token.token) {
    return {
      id,
      ua: provider,
    };
  }
};

/**
 * JwtStrategy
 */
export default (app: EggApplication) => {
  const { jwtSecret } = app.config;
  const jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('QJWT');
  const options = {
    jwtFromRequest,
    secretOrKey: jwtSecret,
    passReqToCallback: true,
  };
  return new JwtStrategy(options, async (req, jwtPayload, done) => {
    const { id, ua } = jwtPayload;
    const user = {
      id,
      provider: ua,
    };
    app.passport.doVerify(req, user, done);
  });
};

export {
  verify,
};
