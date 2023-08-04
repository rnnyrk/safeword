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
  variant = 'primary',
}: ActionButtonProps) {
  const router = useRouter();

  let textColor: 'primary' | 'gray' = 'primary';
  if (isDisabled) {
    textColor = 'gray';
  }

  return (
    <Pressable
      onPress={onPress ? onPress : () => router.back()}
      disabled={isDisabled}
    >
      {({ pressed }) => (
        <ActionButtonContainer
          style={style}
          variant={variant}
          isPressed={pressed}
        >
          {direction === 'left' && (
            <ArrowLeft
              fill={theme.colors[textColor]}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            color={textColor}
            size={textSize || 18}
          >
            {children}
          </Text>
          {direction === 'right' && (
            <ArrowRight
              fill={theme.colors[textColor]}
              style={{ marginLeft: 8 }}
            />
          )}
        </ActionButtonContainer>
      )}
    </Pressable>
  );
}

export type ActionButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  direction?: 'left' | 'right';
  textSize?: TextProps['size'];
  onPress?: () => void;
  style?: any;
  variant?: 'primary' | 'secondary';
};
