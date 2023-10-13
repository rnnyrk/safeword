import styled, { css } from 'styled-components/native';

import { windowWidth } from 'utils';

import { type ActionButtonProps } from '.';

export const ActionButtonContainer = styled.View<ActionButtonContainerProps>`
  position: relative;
  flex-direction: row;

  ${({ theme, variant, isPressed }) =>
    variant === 'secondary' &&
    css`
      width: ${windowWidth - 40}px;
      height: 70px;
      padding: 16px 32px;
      justify-content: center;
      border-radius: 8px;
      border: 2px solid ${isPressed ? theme.colors.whiteOff : theme.colors.pale};
      background-color: ${isPressed ? theme.colors.whiteOff : theme.colors.pale};
    `}

  ${({ theme, variant, isPressed }) =>
    variant === 'delete' &&
    css`
      width: ${windowWidth - 40}px;
      height: 70px;
      padding: 16px 32px;
      justify-content: center;
      border-radius: 8px;
      border: 2px solid ${isPressed ? theme.colors.whiteOff : theme.colors.lightRed};
      background-color: ${isPressed ? theme.colors.whiteOff : theme.colors.lightRed};
    `}
`;

type ActionButtonContainerProps = {
  isPressed?: boolean;
  variant?: ActionButtonProps['variant'];
};
