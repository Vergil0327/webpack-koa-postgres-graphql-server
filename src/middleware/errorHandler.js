import Boom from 'boom';

const debug = require('debug')('dev:errorHandler');

export default () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const boomError = Boom.isBoom(err) ? err : Boom.boomify(err);

    debug('Error Message:', boomError.message);
    debug(boomError.stack);

    const { statusCode, error, message } = boomError.output.payload;
    ctx.status = statusCode;
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = { statusCode, error, message };
  }
};
