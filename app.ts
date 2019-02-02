import { Application } from 'egg';
import JwtStrategy, { verify } from './app/auth/jwt';

export default (app: Application) => {
  // egg-passport 鉴权
  app.passport.verify(verify);
  app.passport.use('jwt', JwtStrategy(app));

  app.validator.addRule('Mid', (rule, value: string) => {
    const mongoIdReg = /^[a-z0-9]{24}$/;
    if (rule.type === 'Mid' && value && mongoIdReg.test(value)) {
      return;
    }
    return 'mongo id is required';
  });

  app.validator.addRule('File', (rule, value) => {
    if (rule.type === 'File' && value && value.filepath) {
      return;
    }
    return 'file is required';
  });
};
