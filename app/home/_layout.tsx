import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { LogoHeader } from 'common/layout';

const DrawerLabelStyle = {
  color: theme.colors.darkGray,
  fontSize: 24,
  fontFamily: theme.fonts.LexendDeca[800],
};

function CustomDrawerContent({ drawerPosition, navigation }: any) {
  const insets = useSafeAreaInsets();

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
      />
      <DrawerItem
        label="Instellingen"
        onPress={() => navigation.navigate('settings')}
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
          drawerLabelStyle: {
            color: theme.colors.gray,
            fontFamily: theme.fonts.LexendDeca[800],
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
