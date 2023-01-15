import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  Config,
} from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { createServer } from 'http';
import { isDevelopment, PORT } from './config';
import dataSources from './datasources';
import { schema } from './graphql';
import {
  ApolloLogPlugin,
  authContext,
  formatError,
} from './middlewares';

process
  .on('unhandledRejection', (error, p) => {
    // FIXME: use logger
    console.error(error as never, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (error) => {
    // FIXME: use logger

    console.error(error, 'Uncaught Exception thrown');
    process.exit(1);
  });
const app = express();
const httpServer = createServer(app);
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
app.use(graphqlUploadExpress()); // Used to parse uploaded files to graphql

export const apolloConfig: Config<ExpressContext> = {
  schema,
  context: authContext,
  formatError,
  dataSources,
  introspection: isDevelopment,
  plugins: [
    // @ts-ignore
    ApolloLogPlugin(),
    isDevelopment
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
};

const apolloServer = new ApolloServer(apolloConfig);

export async function startApolloServer(port: number = PORT) {
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: true,
    bodyParserConfig: {
      limit: '50mb',
    },
  });
  // app.use(finalErrorHandler);

  await new Promise((resolve) =>
    httpServer.listen({ port }, () => resolve(null)),
  );
  console.info(`Server is now running on http://localhost:${port}/graphql`);
}
