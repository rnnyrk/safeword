import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import theme from 'styles/theme';
import { ArrowLeft } from 'common/svg/ArrowLeft';
import { Text } from 'common/typography';

import { BackButtonContainer } from './styled';

export function BackButton({ children, style }: BackButtonProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()}>
      <BackButtonContainer style={style}>
        <ArrowLeft fill={theme.colors.primary} />
        <Text
          color="primary"
          style={{ marginLeft: 8 }}
          size={18}
        >
          {children}
        </Text>
      </BackButtonContainer>
    </Pressable>
  );
}

type BackButtonProps = {
  children: React.ReactNode;
  style?: any;
};
