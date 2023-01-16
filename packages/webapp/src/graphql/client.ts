
import { cacheExchange } from '@urql/exchange-graphcache';
// import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import toast from 'react-hot-toast';
import { createClient, dedupExchange, errorExchange, fetchExchange } from 'urql';
import { config } from '../config';

/**
 * Consistently determine the API URL for the current client even when in a deploy preview or similar
 */
const getAPIUrl = (): string => {
  return `${config.apiBaseUrl}/graphql`;
};

export const client = () =>
  createClient({
    exchanges: [
      errorExchange({
        onError: (error: { message: string; }) => {
          toast.error(error.message.replace('[GraphQL]', 'Server error:'));
        },
      }),
      dedupExchange,
      cacheExchange({
        keys: {
          SuperHero: () => null,
        },
      }),
      fetchExchange,
  
      // multipartFetchExchange,
    ],
    fetchOptions: {
      credentials: 'omit',
    },
    requestPolicy: `cache-and-network`,
    url: getAPIUrl(),
  });
