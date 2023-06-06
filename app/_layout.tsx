import {
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/lexend-deca';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';
import { LogoHeader } from 'common/layout';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="dark" />
        <LogoHeader />
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
