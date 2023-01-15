import { gql } from 'apollo-server-express';
import {
  JSONObjectResolver,
  JSONResolver,
  URLResolver,
} from 'graphql-scalars';
import GraphQLUpload  from 'graphql-upload/GraphQLUpload.js';

export const commonTypeDefs = gql`

  scalar Upload
  
  scalar URL

  scalar JSON

  scalar JSONObject
`;

export const commonResolvers = {
  Upload: GraphQLUpload,
  URL: URLResolver,
  JSON: JSONResolver,
  JSONObject: JSONObjectResolver,
};
