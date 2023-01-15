import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddlewareToDeclaredResolvers } from 'graphql-middleware';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: 'ignore',
  },
});

export const schema = applyMiddlewareToDeclaredResolvers(
  executableSchema,
);
