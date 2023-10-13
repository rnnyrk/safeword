import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function GroupLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        initialRouteName="index"
        screenOptions={{ header: () => null }}
      />
    </>
  );
}
