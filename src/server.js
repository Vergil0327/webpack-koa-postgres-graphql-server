import Koa from 'koa';
import Boom from 'boom';
import middleware from './middleware';
import router from './router';
import schema from './schema';
import {
  serverConfig,
} from '../config';
import postgresDb from '../db/connector';

const debug = require('debug')('dev:server');

const app = new Koa();

const options = {
  context: {
    knex: postgresDb,
  },
  formatError: (err) => {
    debug('[Graphql Error Formatter]');
    debug(err);

    const {
      path,
      locations,
    } = err;

    if (err.originalError) {
      const boomError = Boom.isBoom(err.originalError) ?
        err.originalError :
        Boom.boomify(err.originalError);
      const {
        statusCode,
        error,
        message,
      } = boomError.output.payload;

      return {
        statusCode,
        error,
        message,
        path,
        locations,
      };
    }

    const boomError = Boom.boomify(err, {
      statusCode: 400,
    });
    const {
      statusCode,
      error,
      message,
    } = boomError.output.payload;

    return {
      statusCode,
      error,
      message,
      path,
      locations,
    };
  },
};

app.use(middleware());
app.use(router(schema, options));

/* eslint-disable function-paren-newline */
// * Conflict between max-len with function-paren-newline
app.listen(serverConfig.port, () =>
  console.log(`GraphQL-server listening on port ${serverConfig.port}.`),
);