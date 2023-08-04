import styled, { css } from 'styled-components/native';

import { windowWidth } from 'utils';

import { type ActionButtonProps } from '.';

export const ActionButtonContainer = styled.View<ActionButtonContainerProps>`
  flex-direction: row;

  ${({ theme, variant, isPressed }) =>
    variant === 'secondary' &&
    css`
      width: ${windowWidth - 40};
      padding: 16px 32px;
      justify-content: center;
      border-radius: 8px;
      border: 2px solid ${isPressed ? theme.colors.primary : theme.colors.mediumGray};
      background-color: ${isPressed ? theme.colors.lightGray : theme.colors.mediumGray};
    `}
`;

type ActionButtonContainerProps = {
  isPressed?: boolean;
  variant?: ActionButtonProps['variant'];
};
