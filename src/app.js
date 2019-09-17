import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import routers from './routers';
import {
  cfg
} from './config';
import whiteListOrigin from './middlewares/white-list-origin';
import {
  getLogger
} from './services/logger';
import routeLog from './middlewares/router-log';

const logger = getLogger('API SERVER');

const app = new Koa();
app
  .use(whiteListOrigin)
  .use(routeLog)
  .use(bodyParser({
    enableTypes: ['json'],
    extendTypes: ['application/json'],
    onerror: function (err, ctx) {
      ctx.throw('Body parse error', 422);
    }
  }))
  .use(routers)
app.listen(cfg('APP_PORT', parseInt) || 3000, cfg('APP_HOST', String), function () {
  logger.info(`Server running on https://${cfg('APP_HOST', String)}:${cfg('APP_PORT', parseInt)}`)
});