import { DotLoader } from '../../layout';
import { ButtonContainer, ButtonIcon, ButtonLabel, ButtonWrapper } from './styled';
import { ButtonProps } from './types';

export const Button = ({
  children,
  icon,
  isLoading,
  isDisabled,
  iconPosition = 'left',
  onPress,
  variant,
  style,
}: ButtonProps) => {
  const styledButtonProps = {
    isDisabled,
    isLoading,
    iconOnly: !children && Boolean(icon),
    iconPosition,
    variant,
  };

  const iconOnly = !children && Boolean(icon);

  return (
    <ButtonContainer
      onPress={onPress}
      style={style}
      disabled={isDisabled}
      variant={variant}
    >
      {({ pressed }) => {
        return (
          <ButtonWrapper
            {...styledButtonProps}
            isPressed={pressed}
          >
            {isLoading ? (
              <DotLoader color={isDisabled ? 'black' : 'white'} />
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
                <ButtonLabel variant={variant}>{children}</ButtonLabel>
              </>
            )}
          </ButtonWrapper>
        );
      }}
    </ButtonContainer>
  );
};
