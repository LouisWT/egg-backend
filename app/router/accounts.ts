import { Application } from 'egg';

/**
 * Get index
 * GET new new
 * GET :id show
 * GET :id/edit edit
 * POST create
 * PUT update
 * DELETE destory
 */

export default (app: Application) => {
  const { controller, router } = app;
  const subRouter = router.namespace('/api/v2/accounts');

  // 使用 JWT 策略鉴权
  const jwt = app.passport.authenticate('jwt', {
    session: false,
    successReturnToOrRedirect: null,
  });

  subRouter.put('/', jwt, controller.accounts.update);

  subRouter.get('/docs', jwt, controller.accounts.index);
};
