import { authConfig } from 'config';
import {
  JwtStrategy as Strategy,
  ExtractJwt,
} from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader,
  secretOrKey: authConfig.jwtSecret,
  passReqToCallback: true,
};

