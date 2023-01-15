import { ApolloServer } from 'apollo-server-express';
import { apolloConfig } from '../../src/app';
import SuperHeroApi from '../../src/datasources/superhero';

export const mockContext = () => ({
 authToken: 'faketoken'
});

export const constructTestServer = ({ context = mockContext } = {}) => {
  const superheroApi = new SuperHeroApi();

  const server = new ApolloServer({
    ...apolloConfig,
    //@ts-ignore
    dataSources: () => ({ superheroApi }),
    context,
  });

  return { server, superheroApi };
};
