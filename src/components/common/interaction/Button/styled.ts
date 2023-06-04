import styled, { css } from 'styled-components/native';

import { ButtonProps, IconType } from './types';

export const ButtonIcon = styled.View<IconType>`
  width: 16px;
  height: 16px;
  margin: 0 8px 0 0;
  align-items: center;

  ${({ iconPosition }) => iconPosition === 'right' && css`
    margin: 0 0 0 8px;
  `}

  ${({ iconOnly }) => iconOnly && css`
    margin: 0;
  `}
`;

export const ButtonContainer = styled.Pressable`
  height: 48px;
  width: 200px;
`;

export const ButtonWrapper = styled.View<ButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: #82BC00;
  border-radius: 4px;

  ${({ isPressed }) => isPressed && css`
    background-color: #628F01;
  `}

  ${({ isDisabled }) => isDisabled && css`
    opacity: 0.4;
    background-color: #999999;
  `}

  ${({ iconPosition }) => iconPosition === 'right' && css`
    flex-direction: row-reverse;
  `}

  ${({ iconOnly }) => iconOnly && css`
    width: 80px;
  `}
`;

export const ButtonLabel = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
`;
