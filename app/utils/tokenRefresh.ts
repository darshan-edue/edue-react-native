import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '../lib/apollo-client';
import { REFRESH_TOKEN } from '../graphql/mutations/refreshToken';
import { router } from 'expo-router';

let refreshInterval: NodeJS.Timeout | null = null;

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userToken');
};

export const startTokenRefresh = async () => {
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  // Function to refresh token
  const refreshToken = async () => {
    try {
      const currentToken = await AsyncStorage.getItem('userToken');
      if (!currentToken) {
        stopTokenRefresh();
        return;
      }

      // The authLink in apollo-client.ts will automatically add the authorization header
      const { data } = await client.mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          input: {
            token: currentToken
          }
        },
        // Ensure we're not using cached data for this mutation
        fetchPolicy: 'no-cache',
        // Ensure we're not using cached headers
        context: {
          headers: {
            authorization: `JWT ${currentToken}`
          }
        }
      });

      if (data?.refreshToken?.token) {
        await AsyncStorage.setItem('userToken', data.refreshToken.token);
        console.log('Token refreshed successfully', data.refreshToken.token);
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      stopTokenRefresh();
      // If token refresh fails, we should logout the user
      await handleLogout();
    }
  };

  // Initial refresh
  await refreshToken();

  // Set up interval for refresh every 30 minutes (30 * 60 * 1000 milliseconds)
  refreshInterval = setInterval(refreshToken, 30 * 60 * 1000);
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};

export const handleLogout = async () => {
  // Stop token refresh
  stopTokenRefresh();
  
  // Remove token from storage
  await AsyncStorage.removeItem('userToken');
  
  // Redirect to login
  router.replace('/login');
}; 