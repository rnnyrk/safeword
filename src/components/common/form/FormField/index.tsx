import * as React from 'react';
import { FieldError } from 'react-hook-form';
import { Animated, Pressable } from 'react-native';

import theme from 'styles/theme';

import { FormDescription } from '../FormDescription';
import { FormFieldWrapper, FieldWrapper, InputWrapper, Label } from './styled';

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  description,
  isActive,
  hasValue,
  onPress,
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const animateTransition = (reverse = false) => {
    return Animated.timing(animatedValue, {
      toValue: reverse ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    });
  };

  React.useEffect(() => {
    animateTransition(!isActive && !hasValue).start();
  }, [isActive, hasValue]);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.gray, theme.colors.black],
  });

  const interPolatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.gray, theme.colors.primary],
  });

  const interpolatedScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const interpolatedPositionY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const interpolatedPositionX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -16],
  });

  console.log({ error });

  return (
    <FormFieldWrapper
      {...(onPress && {
        as: Pressable,
        onPress,
      })}
    >
      <FieldWrapper style={{ borderColor: interPolatedBorderColor }}>
        <Animated.View
          style={{
            transform: [
              { translateX: interpolatedPositionX },
              { translateY: interpolatedPositionY },
              { scale: interpolatedScale },
            ],
          }}
        >
          <Label style={{ color: interpolatedColor }}>{label}</Label>
        </Animated.View>
        <InputWrapper>{children}</InputWrapper>
      </FieldWrapper>
      {(error || description) && (
        <FormDescription isError={!!error}>{error?.message || description}</FormDescription>
      )}
    </FormFieldWrapper>
  );
};

export type FormFieldProps = {
  label?: string;
  description?: string;
  error?: FieldError;
  isActive?: boolean;
  hasValue?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
};
