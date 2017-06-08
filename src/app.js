import Koa from 'koa';
import Router from 'lark-router';
import convert from 'koa-convert';
import errorRes from 'app/middlewares/error-res';
import morgan from 'app/middlewares/morgan';
import responseTime from 'app/middlewares/response-time';
import conditionalGet from 'app/middlewares/conditional-get';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import validate from 'koa-validate';

const app = new Koa();
const router = new Router().load('controllers');

// error handle
app.use(errorRes);

// request&response information
app.use(morgan);

// generate response time
app.use(responseTime);

// client cache
app.use(conditionalGet);
app.use(convert(etag()));

// secure
app.use(helmet());

// compress transfer
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH,
}));

// signature cookie key
app.keys = ['lwt_backend_project'];

// parse http request
app.use(bodyParser());

// validate param
validate(app);

// passport

// load routers
app.use(router.routes());

// listen port
app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});