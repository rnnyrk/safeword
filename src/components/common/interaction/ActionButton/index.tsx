import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import theme from 'styles/theme';
import { ArrowLeft, ArrowRight } from 'common/svg';
import { Text, type TextProps } from 'common/typography';

import { ActionButtonContainer } from './styled';

export function ActionButton({
  children,
  isDisabled,
  direction = 'left',
  onPress,
  textSize,
  style,
}: ActionButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={onPress ? onPress : () => router.back()}
      disabled={isDisabled}
    >
      <ActionButtonContainer style={style}>
        {direction === 'left' && (
          <ArrowLeft
            fill={theme.colors[isDisabled ? 'gray' : 'primary']}
            style={{ marginRight: 8 }}
          />
        )}
        <Text
          color={isDisabled ? 'gray' : 'primary'}
          size={textSize || 18}
        >
          {children}
        </Text>
        {direction === 'right' && (
          <ArrowRight
            fill={theme.colors[isDisabled ? 'gray' : 'primary']}
            style={{ marginLeft: 8 }}
          />
        )}
      </ActionButtonContainer>
    </Pressable>
  );
}

type ActionButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  direction?: 'left' | 'right';
  textSize?: TextProps['size'];
  onPress?: () => void;
  style?: any;
};
