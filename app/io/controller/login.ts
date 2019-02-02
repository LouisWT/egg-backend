import { Controller } from 'egg';

export default class LoginController extends Controller {
  async qrcode() {
    const { ctx, app } = this;
    const socketId = ctx.socket.id;
    const ticket = await ctx.service.publicplat.getPublicToken();
    const { qrcodeUrl } = app.config.login;
    let url;
    if (ticket) { url = `${qrcodeUrl}${encodeURIComponent(ticket)}`; }
    await ctx.service.publicplat.cacheTicketSocketId(ticket, socketId);
    await ctx.socket.emit('qrcode', url);
  }
}
