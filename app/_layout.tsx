import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inCoursesGroup = segments[0] === 'courses';
    const inCanvasGroup = segments[0] === 'canvas';

    // If we're not in any group and not on the login page, redirect to login
    if (!inAuthGroup && !inCoursesGroup && !inCanvasGroup && segments[0] !== 'login') {
      router.replace('/login');
    }
  }, [segments]);

  return (
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
  );
}
