import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { windowWidth } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { LogoHeader } from 'common/layout';

const DrawerLabelStyle = {
  color: theme.colors.white,
  fontSize: 24,
  fontFamily: theme.fonts.LexendDeca[800],
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
        label="Groepen beheren"
        onPress={() => navigation.navigate('index')}
        labelStyle={DrawerLabelStyle}
      />
      <DrawerItem
        label="Instellingen"
        onPress={() => navigation.navigate('settings')}
        labelStyle={DrawerLabelStyle}
      />
      <DrawerItem
        label="Uitloggen"
        onPress={signOut}
        labelStyle={DrawerLabelStyle}
      />
    </ScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
