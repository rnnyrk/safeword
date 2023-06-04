import * as React from 'react';

import { ButtonLoader } from './components';
import { ButtonContainer, ButtonIcon, ButtonLabel, ButtonWrapper } from './styled';
import { ButtonProps } from './types';

const ButtonContent = ({ children, icon, isLoading, iconOnly, iconPosition }: ButtonProps) => (
  <>
    {isLoading ? (
      <ButtonLoader />
    ) : (
      <>
        {icon && (
          <ButtonIcon
            iconOnly={iconOnly}
            iconPosition={iconPosition}
          >
            {icon}
          </ButtonIcon>
        )}
        <ButtonLabel>{children}</ButtonLabel>
      </>
    )}
  </>
);

export const Button = ({
  children,
  icon,
  isLoading,
  isDisabled,
  iconPosition = 'left',
  onPress,
}: ButtonProps) => {
  const styledButtonProps = {
    isDisabled,
    isLoading,
    iconOnly: !children && Boolean(icon),
    iconPosition,
  };

  const buttonContentProps = {
    children,
    icon,
    isLoading,
    iconOnly: !children && Boolean(icon),
    iconPosition,
  };

  return (
    <ButtonContainer onPress={onPress}>
      {({ pressed }) => {
        return (
          <ButtonWrapper
            {...styledButtonProps}
            isPressed={pressed}
          >
            <ButtonContent {...buttonContentProps} />
          </ButtonWrapper>
        );
      }}
    </ButtonContainer>
  );
};
