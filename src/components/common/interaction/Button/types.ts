import { PressableProps } from 'react-native';

export type ButtonType = {
  children?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export type IconType = {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
};

export type ButtonVariantsType = {
  variant?: 'primary';
};

export type ButtonProps = PressableProps
& ButtonType
& ButtonVariantsType
& IconType
& {
  isPressed?: boolean;
};
