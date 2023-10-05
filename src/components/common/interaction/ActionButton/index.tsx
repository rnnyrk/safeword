import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import theme from 'styles/theme';
import { DotLoader } from 'common/layout';
import { ArrowLeft, ArrowRight, Refresh } from 'common/svg';
import { Text, type TextProps } from 'common/typography';

import { ActionButtonContainer } from './styled';

const getIcon = ({ direction, icon, textColor }: GetIconProps) => {
  const style = direction === 'left' ? { marginRight: 8 } : { marginLeft: 8 };

  if (icon === 'arrow') {
    if (direction === 'left') {
      return (
        <ArrowLeft
          fill={theme.colors[textColor || 'black']}
          style={style}
        />
      );
    } else if (direction === 'right') {
      return (
        <ArrowRight
          fill={theme.colors[textColor || 'black']}
          style={style}
        />
      );
    }
  }

  if (icon === 'refresh') {
    return (
      <Refresh
        fill={theme.colors[textColor || 'black']}
        style={style}
      />
    );
  }

  return null;
};

type GetIconProps = {
  direction: ActionButtonProps['direction'];
  icon?: ActionButtonProps['icon'];
  textColor: TextProps['color'];
};

export function ActionButton({
  children,
  direction = 'left',
  isDisabled,
  isLoading,
  onPress,
  icon = 'arrow',
  textSize,
  style,
  subChildren,
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
            isPressed={!isDisabled && pressed ? true : false}
          >
            {isLoading && <DotLoader color={isDisabled ? 'black' : 'white'} />}

            {!isLoading && (
              <>
                {direction === 'left' && getIcon({ direction, icon, textColor })}
                <Text
                  color={textColor}
                  size={textSize || 22}
                >
                  {children}
                </Text>
                {subChildren && subChildren}
                {direction === 'right' && getIcon({ direction, icon, textColor })}
              </>
            )}
          </ActionButtonContainer>
        );
      }}
    </Pressable>
  );
}

export type ActionButtonProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: 'arrow' | 'refresh' | null;
  onPress?: () => void;
  textSize?: TextProps['size'];
  style?: any;
  subChildren?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'alternative';
};
