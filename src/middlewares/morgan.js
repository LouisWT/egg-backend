import morgan from 'koa-morgan';

morgan.token('realIP', (req) => {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
});

const logStyle =
  ':remote-addr :realIP [:date[iso]]' +
  ' ":method :url" :status :' +
  'res[content-length] :response-time ms ' +
  '":referrer" ":user-agent"';

const logger = morgan(logStyle);

module.exports = logger;
