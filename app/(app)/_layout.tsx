import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ header: () => null }}
    />
  );
}
