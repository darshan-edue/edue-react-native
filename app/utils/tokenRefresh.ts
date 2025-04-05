import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '../lib/apollo-client';
import { REFRESH_TOKEN } from '../graphql/mutations/refreshToken';
import { router } from 'expo-router';

let refreshInterval: NodeJS.Timeout | null = null;

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userToken');
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('refreshToken');
};

export const startTokenRefresh = async () => {
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  // Function to refresh token
  const refreshToken = async () => {
    try {
      const currentRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (!currentRefreshToken) {
        stopTokenRefresh();
        return;
      }

      // The authLink in apollo-client.ts will automatically add the authorization header
      const { data } = await client.mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          input: {
            token: currentRefreshToken
          }
        },
        // Ensure we're not using cached data for this mutation
        fetchPolicy: 'no-cache',
        // Ensure we're not using cached headers
        context: {
          headers: {
            authorization: `JWT ${currentRefreshToken}`
          }
        }
      });

      if (data?.refreshToken?.token && data?.refreshToken?.refreshToken) {
        await AsyncStorage.setItem('userToken', data.refreshToken.token);
        await AsyncStorage.setItem('refreshToken', data.refreshToken.refreshToken);
        console.log('Tokens refreshed successfully');
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
  
  // Remove tokens from storage
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('refreshToken');
  
  // Redirect to login
  router.replace('/login');
}; 