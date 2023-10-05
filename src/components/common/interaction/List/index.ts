import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

import { Text } from 'common/typography';

const ListItemCss = css<ListItemType>`
  flex-direction: row;
  align-items: center;
  height: 56px;
  padding: 8px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ size }) =>
    size === 'large' &&
    css`
      height: 68px;
    `}

  ${({ isPressed }) =>
    isPressed &&
    css`
      background-color: ${({ theme }) => theme.colors.whiteOff};
      border-color: ${({ theme }) => theme.colors.gray};
    `}

  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    `}  
    
    ${({ isPressed, variant }) =>
    isPressed &&
    variant === 'secondary' &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    `}

  ${({ variant }) =>
    variant === 'warning' &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${({ theme }) => theme.colors.darkGray};
      background-color: ${({ theme }) => theme.colors.whiteOff};
    `}
`;

const ListItem = styled.View<ListItemType>`
  ${ListItemCss}
`;

const AnimatedListItem = styled(Animated.View)<ListItemType>`
  ${ListItemCss}
`;

type ListItemType = {
  variant?: 'warning' | 'secondary';
  size?: 'small' | 'large';
  isPressed?: boolean;
};

const ListCheck = styled.View<ListCheckProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 16px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ active }) =>
    active &&
    css`
      border-color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.primary};
    `}
`;

type ListCheckProps = {
  active?: boolean;
};

export const ListAction = styled.Pressable`
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  height: 100%;
`;

const ListText = styled(Text)<ListTextType>`
  ${({ isPressed }) =>
    isPressed &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
`;

type ListTextType = {
  isPressed?: boolean;
};

const ListSubtext = styled(Text).attrs({
  family: 'tradeGothicBold',
  size: 14,
})<ListSubtextType>`
  max-width: 100%;
  height: 24px;
  overflow-x: hidden;
  color: ${({ theme }) => theme.colors.gray};

  ${({ isPressed }) =>
    isPressed &&
    css`
      color: ${({ theme }) => theme.colors.black};
    `}
`;

type ListSubtextType = {
  isPressed?: boolean;
};

const ListRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const ListContent = styled.View`
  flex: 1;
  align-items: flex-start;
`;

export const List = {
  Action: ListAction,
  AnimatedItem: AnimatedListItem,
  Check: ListCheck,
  Content: ListContent,
  Item: ListItem,
  Row: ListRow,
  Text: ListText,
  Subtext: ListSubtext,
};
