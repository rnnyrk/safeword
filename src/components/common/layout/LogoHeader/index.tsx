import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Safeword } from 'common/svg';

import { LogoHeaderContainer } from './styled';

export const LogoHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <LogoHeaderContainer paddingTop={insets.top + 20}>
      <Safeword width={200} />
    </LogoHeaderContainer>
  );
};
