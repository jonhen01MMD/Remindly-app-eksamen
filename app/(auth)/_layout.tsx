import { Stack } from 'expo-router';
import { ReminderProvider } from '../../stores/ReminderStore';
import { SettingsProvider } from '../../stores/SettingsStore';

export default function AuthLayout() {
  return (
    <SettingsProvider>
      <ReminderProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            gestureEnabled: true,
            headerStyle: { backgroundColor: '#1F2937' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#FFA726',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
          <Stack.Screen name="settings/profile" options={{ title: 'Account' }} />
          <Stack.Screen name="settings/privacy" options={{ title: 'Privacy' }} />
        </Stack>
      </ReminderProvider>
    </SettingsProvider>
  );
}