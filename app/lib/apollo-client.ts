import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI,
  cache: new InMemoryCache(),
});

export { ApolloProvider }; 