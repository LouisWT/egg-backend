import { Strategy as CustomStrategy } from 'passport-custom';
import { queryNonce, verifyPassword } from '../utils';

export default new CustomStrategy(async (ctx, done) => {
  try {
    const { mail, password } = ctx.body;
    if (mail && password) {
      const nonce = await queryNonce(mail);
      if (nonce) {
        if (verifyPassword(nonce.password, nonce.nonce, password)) {
          const account = {
            id: Number(nonce.id),
            name: nonce.name,
            avatar: nonce.avatar,
            mail,
            versionTag: nonce.versionTag,
          };
          done(null, account);
        } else {
          done(null, false);
        }
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
