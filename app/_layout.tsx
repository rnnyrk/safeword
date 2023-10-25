import type * as i from 'types';
import { useEffect } from 'react';
import {
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/lexend-deca';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import theme from 'styles/theme';
import { getLocalData, onChangeLanguage } from 'utils';
import { SupabaseProvider } from 'utils/SupabaseContext';
import { ToastProvider } from 'common/interaction';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 60 seconds
      cacheTime: 1000 * 6 * 10, // 10 minutes
      retry: false,
    },
  },
});

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_800ExtraBold,
  });

  useEffect(() => {
    (async () => {
      // Load current locale
      const locale = await getLocalData<i.Languages>('locale');
      if (locale) {
        onChangeLanguage(locale);
      }
    })();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SupabaseProvider>
            <ToastProvider>
              <StatusBar style="dark" />
              <Stack
                initialRouteName="index"
                screenOptions={{ header: () => null }}
              />
            </ToastProvider>
          </SupabaseProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
