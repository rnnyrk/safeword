import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import theme from 'styles/theme';
import { ArrowLeft, ArrowRight, Refresh } from 'common/svg';
import { Text, type TextProps } from 'common/typography';

import { ActionButtonContainer } from './styled';

const getIcon = ({ direction, icon, textColor }: GetIconProps) => {
  const style = direction === 'left' ? { marginRight: 8 } : { marginLeft: 8 };

  if (direction === 'left' && !icon) {
    return (
      <ArrowLeft
        fill={theme.colors[textColor || 'black']}
        style={style}
      />
    );
  } else if (direction === 'right' && !icon) {
    return (
      <ArrowRight
        fill={theme.colors[textColor || 'black']}
        style={style}
      />
    );
  }

  return (
    <Refresh
      fill={theme.colors[textColor || 'black']}
      style={style}
    />
  );
};

type GetIconProps = {
  direction: ActionButtonProps['direction'];
  icon?: ActionButtonProps['icon'];
  textColor: TextProps['color'];
};

export function ActionButton({
  children,
  isDisabled,
  direction = 'left',
  onPress,
  icon,
  textSize,
  style,
  variant = 'primary',
}: ActionButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={onPress ? onPress : () => router.back()}
      disabled={isDisabled}
    >
      {({ pressed }) => {
        let textColor: TextProps['color'] = 'primary';
        if (isDisabled) {
          textColor = 'gray';
        }

        if (variant === 'secondary' && pressed) {
          textColor = 'white';
        }

        return (
          <ActionButtonContainer
            style={style}
            variant={variant}
            isPressed={pressed}
          >
            {direction === 'left' && getIcon({ direction, icon, textColor })}
            <Text
              color={textColor}
              size={textSize || 22}
            >
              {children}
            </Text>
            {direction === 'right' && getIcon({ direction, icon, textColor })}
          </ActionButtonContainer>
        );
      }}
    </Pressable>
  );
}

export type ActionButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  icon?: 'refresh';
  direction?: 'left' | 'right';
  textSize?: TextProps['size'];
  onPress?: () => void;
  style?: any;
  variant?: 'primary' | 'secondary' | 'alternative';
};
