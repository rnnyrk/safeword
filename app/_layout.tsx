import { useEffect } from 'react';
import {
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/lexend-deca';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import theme from 'styles/theme';
import { SupabaseProvider } from 'utils/SupabaseContext';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SupabaseProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              initialRouteName="index"
              screenOptions={{ header: () => null }}
            />
          </QueryClientProvider>
        </SupabaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
