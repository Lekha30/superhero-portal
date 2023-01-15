import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { ErrorRequestHandler } from 'express';
import { GraphQLError } from 'graphql';

export function formatError(error: GraphQLError): GraphQLError {
  console.error('GraphQL Error %o', error);
  if (error.extensions?.exception?.stacktrace !== undefined) {
    // eslint-disable-next-line no-param-reassign
    error.extensions.exception.stacktrace = undefined;
  }
  return error;
}

export const ApolloLogPlugin = (): ApolloServerPlugin => {
  return {
    // @ts-ignore
    requestDidStart(requestContext) {
      if (!requestContext.request.query?.includes('IntrospectionQuery')) {
        console.debug(
          'Graphql Request operationName %s',
          requestContext.request.operationName,
        );
      }
      return {
        didEncounterErrors(_requestContext) {
          console.warn(
            `Graphql Request  ${_requestContext.request.operationName} error %o`,
            _requestContext.errors,
          );
        },
      };
    },
  };
};

export const finalErrorHandler: ErrorRequestHandler = (err, _req, res) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  return res.status(500).json({
    message: 'An internal server error occurred',
    statusCode: 500,
  });
};
