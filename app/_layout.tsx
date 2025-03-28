import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { ApolloWrapper } from './providers/ApolloWrapper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startTokenRefresh } from './utils/tokenRefresh';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const inAuthGroup = segments[0] === '(auth)';
      const inCoursesGroup = segments[0] === 'courses';
      const inCanvasGroup = segments[0] === 'canvas';

      if (token) {
        // If we have a token, start refresh mechanism
        await startTokenRefresh();
        
        // If we're not in a protected route, redirect to courses
        if (!inCoursesGroup && !inCanvasGroup && segments[0] !== 'login') {
          router.replace('/courses');
        }
      } else {
        // If no token and not on login page, redirect to login
        if (!inAuthGroup && segments[0] !== 'login') {
          router.replace('/login');
        }
      }
    };

    checkAuthAndRedirect();
  }, [segments]);

  return (
    <ApolloWrapper>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="courses"
          options={{
            title: 'Available Courses',
          }}
        />
        <Stack.Screen
          name="canvas/[id]"
          options={{
            title: 'Drawing Canvas',
          }}
        />
      </Stack>
      <Toast />
    </ApolloWrapper>
  );
}
