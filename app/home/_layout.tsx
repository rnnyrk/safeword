import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { locales, windowWidth } from 'utils';
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

function CustomDrawerContent({
  drawerPosition,
}: DrawerContentComponentProps & { drawerPosition: 'left' | 'right' }) {
  const insets = useSafeAreaInsets();
  const { signOut } = useSupabase();
  const router = useRouter();

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
        label={locales.t('menu.my_group')}
        onPress={() => router.push('/home/')}
        labelStyle={DrawerLabelStyle}
        style={DrawerItemStyle}
      />
      <DrawerItem
        label={locales.t('menu.settings')}
        onPress={() => router.push('/home/settings/')}
        labelStyle={DrawerLabelStyle}
        style={DrawerItemStyle}
      />
      <DrawerItem
        label={locales.t('menu.logout')}
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
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent
            drawerPosition="right"
            {...props}
          />
        )}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="settings" />
      </Drawer>
    </>
  );
}
