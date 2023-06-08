import { Buffer } from 'buffer';
import {
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/lexend-deca';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from 'services/authContext';
import theme from 'styles/theme';

global.Buffer = require('buffer').Buffer;
global.Buffer = Buffer;

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
        <AuthProvider>
          <StatusBar style="dark" />
          <Stack
            initialRouteName="index"
            screenOptions={{ header: () => null }}
          />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
