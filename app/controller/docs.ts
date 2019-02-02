import { Controller } from 'egg';

export default class DocsController extends Controller {
  async create() {
    const { ctx } = this;
    const { id: accountId } = ctx.user;
    const file = ctx.request.files[0];
    const location = ctx.request.body;
    const rule = {
      file: 'File',
      library: 'Mid',
    };
    ctx.validate(rule, {
      file,
      ...location,
    });
    const {status, body} = await ctx.service.transform.uploadConvertDoc(accountId, location, file);
    ctx.realStatus = status;
    ctx.body = body;
  }
}
