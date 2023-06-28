import * as React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { CheckSvg } from 'common/svg';
import theme from 'styles/theme';

import { CheckContainer, CheckboxTouchableContent, Label, CheckboxBox } from './styled';

export const Checkbox: React.FC<CheckboxProps> = ({ isActive, onChange, children }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const animate = (reverse: boolean) => {
    return Animated.timing(animatedValue, {
      toValue: reverse ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    });
  };

  React.useEffect(() => {
    if (isActive) animate(false).start();
    else animate(true).start();
  }, [isActive]);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.grayMedium, theme.colors.greenDark],
  });

  const interpolatedBorderRadius = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 0],
  });

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <CheckboxTouchableContent>
        <CheckboxBox
          style={{ borderColor: interpolatedColor, borderRadius: interpolatedBorderRadius }}
        >
          <CheckContainer style={{ opacity: animatedValue }}>
            <CheckSvg />
          </CheckContainer>
        </CheckboxBox>
        <Label>{children}</Label>
      </CheckboxTouchableContent>
    </TouchableWithoutFeedback>
  );
};

export type CheckboxProps = {
  isActive?: boolean;
  onChange: () => void;
  children: React.ReactNode;
};
