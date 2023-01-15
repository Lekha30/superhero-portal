/* eslint-disable import/first */
if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv-safe').config();
}

import { startApolloServer } from './app';

(async function main() {
  await startApolloServer();
})();
