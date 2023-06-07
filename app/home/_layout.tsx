import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogoHeader } from 'common/layout';

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
      style={{ flex: 1 }}
    >
      <DrawerItem
        label="Mijn groepen"
        onPress={() => {
          navigation.navigate('index');
        }}
      />
      <DrawerItem
        label="Instellingen"
        onPress={() => {
          navigation.navigate('settings');
        }}
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
