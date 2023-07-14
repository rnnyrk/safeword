import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import theme from 'styles/theme';
import { windowWidth } from 'utils';
import { SupabaseProvider, useSupabase } from 'utils/SupabaseContext';
import { LogoHeader } from 'common/layout';

const DrawerLabelStyle = {
  color: theme.colors.primary,
  fontSize: 24,
  fontFamily: theme.fonts.LexendDeca[800],
};

// const DrawerItemStyle = {
//   paddingTop: 8,
//   paddingRight: 16,
//   paddingBottom: 8,
//   paddingLeft: 16,
//   borderRadius: 8,
//   backgroundColor: theme.colors.white,
// };

function CustomDrawerContent({ drawerPosition, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { signOut } = useSupabase();

  return (
    <ScrollView
      contentContainerStyle={[
        {
          paddingTop: insets.top + 4,
          paddingLeft: drawerPosition === 'left' ? insets.left : 0,
          paddingRight: drawerPosition === 'right' ? insets.right : 0,
        },
      ]}
      style={{ flex: 1, marginTop: 24 }}
    >
      <DrawerItem
        label="Mijn groepen"
        onPress={() => navigation.navigate('index')}
        labelStyle={DrawerLabelStyle}
        // style={DrawerItemStyle}
      />
      <DrawerItem
        label="Instellingen"
        onPress={() => navigation.navigate('settings')}
        labelStyle={DrawerLabelStyle}
        // style={DrawerItemStyle}
      />
      <DrawerItem
        label="Uitloggen"
        onPress={signOut}
        labelStyle={DrawerLabelStyle}
        // style={DrawerItemStyle}
      />
    </ScrollView>
  );
}

export default function DrawerLayout() {
  return (
    // <SafeAreaProvider>
    //   <ThemeProvider theme={theme}>
    //     <SupabaseProvider>
    <Drawer
      initialRouteName="screen1"
      screenOptions={{
        header: () => <LogoHeader showDrawer />,
        drawerPosition: 'right',
        drawerStyle: {
          width: windowWidth * 0.9,
          backgroundColor: theme.colors.primary,
        },
      }}
      drawerContent={(props: DrawerContentComponentProps) => {
        return (
          <CustomDrawerContent
            drawerPosition="right"
            {...props}
          />
        );
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="settings" />
    </Drawer>
    //     </SupabaseProvider>
    //   </ThemeProvider>
    // </SafeAreaProvider>
  );
}
