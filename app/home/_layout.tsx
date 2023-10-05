import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { windowWidth } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { LogoHeader } from 'common/layout';

const DrawerLabelStyle = {
  color: theme.colors.primary,
  fontSize: 24,
  fontFamily: theme.fonts.LexendDeca[800],
};

const DrawerItemStyle = {
  paddingTop: 8,
  paddingRight: 16,
  paddingBottom: 8,
  paddingLeft: 16,
  borderRadius: 8,
  backgroundColor: theme.colors.white,
};

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
        label="Mijn groep"
        onPress={() => navigation.navigate('index')}
        labelStyle={DrawerLabelStyle}
        style={DrawerItemStyle}
      />
      <DrawerItem
        label="Instellingen"
        onPress={() => navigation.navigate('settings/index')}
        labelStyle={DrawerLabelStyle}
        style={DrawerItemStyle}
      />
      <DrawerItem
        label="Uitloggen"
        onPress={() => signOut()}
        labelStyle={DrawerLabelStyle}
        style={DrawerItemStyle}
      />
    </ScrollView>
  );
}

export default function HomeScreen() {
  const pathname = usePathname();

  return (
    <>
      <StatusBar style="dark" />
      <Drawer
        initialRouteName="index"
        screenOptions={{
          header: () => (
            <LogoHeader
              showBackButton={pathname === '/home' ? false : true}
              showDrawer
            />
          ),
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
        <Drawer.Screen name="settings/index" />
      </Drawer>
    </>
  );
}
