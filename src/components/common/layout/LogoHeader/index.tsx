import { Href, useNavigation, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { ArrowLeft, Menu, Safeword } from 'common/svg';

import { LogoHeaderContainer } from './styled';

export function LogoHeader({
  showBackButton = false,
  backUrl,
  showDrawer = false,
}: LogoHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <LogoHeaderContainer paddingTop={insets.top + 8}>
      {showBackButton ? (
        <Pressable
          hitSlop={10}
          onPress={() => (backUrl ? router.push(backUrl) : router.back())}
        >
          {({ pressed }) => (
            <ArrowLeft fill={pressed ? theme.colors.primary : theme.colors.darkGray} />
          )}
        </Pressable>
      ) : (
        <View style={{ width: 20 }} />
      )}
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
}

type LogoHeaderProps = {
  backUrl?: Href<string>;
  showBackButton?: boolean;
  showDrawer?: boolean;
};
