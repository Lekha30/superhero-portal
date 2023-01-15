import { ExpressContext } from 'apollo-server-express';
import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer';
import { DataSources } from '../datasources';

export interface AuthContext {
  authToken: string;
  dataSources: DataSources;
}

export const lambdaContext = async ({
  express,
  event,
}: LambdaContextFunctionParams) => {
  console.debug('Lambda Event %o', event);
  return authContext({ req: express.req, res: express.res });
};


export const authContext = async ({
  req,
}: ExpressContext): Promise<AuthContext> => {
  const bearerToken = req?.headers?.authorization;

  console.debug('Headers: %o', req?.headers);

  if (!bearerToken) {
    console.debug('Bearer token missing');

    return {} as AuthContext;
  }

  try {
    const accessToken = bearerToken?.split(' ')?.[1];
    console.log('Response from superhero %s', accessToken);

    
    return { authToken: accessToken } as AuthContext;
  } catch (error) {
    console.error('Error obtaining the token %o', error);
    return  {} as AuthContext;
  }
};
