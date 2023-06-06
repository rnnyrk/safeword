import { useNavigation, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { Menu, Safeword } from 'common/svg';

import { LogoHeaderContainer } from './styled';

export const LogoHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <LogoHeaderContainer paddingTop={insets.top + 8}>
      <View />
      <Safeword width={200} />
      <Pressable
        hitSlop={10}
        // onPress={() => (navigation as any).openDrawer()}
      >
        {({ pressed }) => (
          <Menu fill={pressed ? theme.colors.primaryLight : theme.colors.primary} />
        )}
      </Pressable>
    </LogoHeaderContainer>
  );
};
