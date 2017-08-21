import {
  Strategy as JwtStrategy,
  ExtractJwt,
} from 'passport-jwt';

import { authConfig } from 'config';
import {
  verifyToken,
} from 'app/middlewares/auth/utils';

const jwtFromRequest = ExtractJwt.fromAuthHeader();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader,
  secretOrKey: authConfig.jwtSecret,
  passReqToCallback: true,
};

export default new JwtStrategy(options, async (request, jwtPayload, done) => {
  try {
    const token = jwtFromRequest(request);
    const verifyResult = await verifyToken(token);
    if (verifyResult) {
      done(null, { ...jwtPayload, token });
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

