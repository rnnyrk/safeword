import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SafeWordLogo from 'images/splash.png';

import { LogoHeaderContainer } from './styled';

export const LogoHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <LogoHeaderContainer paddingTop={insets.top}>
      <Image
        source={SafeWordLogo}
        contentFit="contain"
        style={{ width: 200, height: 22, marginTop: 18 }}
      />
    </LogoHeaderContainer>
  );
};
