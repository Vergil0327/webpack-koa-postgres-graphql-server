import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import typeDefs from './schema.graphql';
import userResolver from './user/resolver';

const rootResolver = {};
const hiResolver = {
  Query: {
    hi: () => 'Hello World',
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers: merge(rootResolver, userResolver, hiResolver),
});
