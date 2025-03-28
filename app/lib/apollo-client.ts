import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI,
});

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from AsyncStorage
  const token = await AsyncStorage.getItem('userToken');
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { ApolloProvider }; 