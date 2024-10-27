// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define routes and options */}
        <Stack.Screen name="(auth)/register" options={{ title: "Register" }} />
        <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </>
  );
}
