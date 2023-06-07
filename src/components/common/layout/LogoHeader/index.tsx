import { useNavigation } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { Menu, Safeword } from 'common/svg';

import { LogoHeaderContainer } from './styled';

export const LogoHeader = ({ showDrawer = false }: LogoHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <LogoHeaderContainer paddingTop={insets.top + 8}>
      <View />
      <Safeword width={200} />
      {showDrawer ? (
        <Pressable
          hitSlop={10}
          onPress={() => (navigation as any)?.toggleDrawer()}
        >
          {({ pressed }) => (
            <Menu fill={pressed ? theme.colors.primaryLight : theme.colors.primary} />
          )}
        </Pressable>
      ) : (
        <View />
      )}
    </LogoHeaderContainer>
  );
};

type LogoHeaderProps = {
  showDrawer?: boolean;
};
