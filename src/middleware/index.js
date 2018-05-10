import compose from 'koa-compose';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import json from 'koa-json';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import errorHandle from './errorHandler';

export default function middleware() {
  return compose([logger(), helmet(), cors(), json(), compress(), bodyParser(), errorHandle()]);
}
