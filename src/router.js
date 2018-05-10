import Router from 'koa-router';
import compose from 'koa-compose';
import {
  graphqlKoa,
  graphiqlKoa,
} from 'apollo-server-koa';
import KoaPlaygroundMiddleware from 'graphql-playground-middleware-koa';

export default function rootRouter(schema, options) {
  const router = new Router();

  router.post(
    '/graphql',
    graphqlKoa({
      schema,
      ...options,
    }),
  );
  router.get(
    '/graphql',
    graphqlKoa({
      schema,
      ...options,
    }),
  );
  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL: '/graphql',
    }),
  );
  router.all(
    '/playground',
    KoaPlaygroundMiddleware({
      endpointUrl: '/graphql',
    }),
  );
  router.get('/test', async (ctx) => {
    ctx.body = {
      say: 'Hello World',
    };
  });

  return compose([router.routes(), router.allowedMethods()]);
}