import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_800ExtraBold,
} from '@expo-google-fonts/lexend-deca';

import { Bolt } from 'common/svg/Bolt';
import theme from 'styles/theme';
import {  LogoHeader } from 'common/layout';

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
        <View style={{ flex: 1 }}>
          <StatusBar style="dark" />
          <Tabs
            initialRouteName="index"
            screenOptions={{
              tabBarIcon: ({ color }) => (
                <Bolt width={20} height={20} fill={color} />
              ),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                header: () => <LogoHeader />,
              }}
            />
            <Tabs.Screen
              name="environment"
              options={{
                title: 'Environment',
                headerTitle: 'Environment variables',
              }}
            />
          </Tabs>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
