import { ApolloServer } from 'apollo-server-lambda';
import cors from 'cors';
import express from 'express';
// import { graphqlUploadExpress } from 'graphql-upload';
import { apolloConfig } from './app';
// import { finalErrorHandler, lambdaContext } from './middlewares';

export const apolloServer = new ApolloServer({
  ...apolloConfig,
  // context: lambdaContext,
});

exports.handler = apolloServer.createHandler({
  expressAppFromMiddleware(middleware) {
    const app = express();
    app.use(cors());
    app.disable('x-powered-by');
    app.use(
      express.json({
        limit: '50mb',
      }),
    ); // Used to parse JSON bodies
    app.use(
      express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 5000000,
      }),
    );
    // app.use(graphqlUploadExpress()); // Used to parse uploaded files to graphql
    app.use(middleware);
    // app.use(finalErrorHandler);

    return app;
  },
});
