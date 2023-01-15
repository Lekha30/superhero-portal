import { mergeResolvers } from '@graphql-tools/merge';
import { searchResolvers } from './search';
import { commonResolvers } from './common';

export const resolvers = mergeResolvers([
  commonResolvers,
  searchResolvers,
]);
