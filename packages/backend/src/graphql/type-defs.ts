import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { searchTypeDefs } from './search/search.schema';
import { commonTypeDefs } from './common';


export const typeDefs = mergeTypeDefs([
  commonTypeDefs,
  searchTypeDefs,
]);

// Schema specifically for code gen independent from resolvers/services
export const codeGenSchema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: {
    requireResolversForResolveType: 'ignore',
  },
});
