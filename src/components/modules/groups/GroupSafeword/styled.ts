import styled, { css } from 'styled-components/native';

export const GroupSafewordDate = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 32px;
`;

export const GroupSafewordContent = styled.View`
  position: relative;
  z-index: 50;
  align-items: center;
  padding: 88px 24px 0px 24px;
  height: 100%;
`;

export const GroupSafewordWord = styled.View`
  position: relative;
  align-items: center;
`;

export const GroupSafewordRefresh = styled.View<GroupSafewordRefreshProps>`
  padding: 8px;

  ${({ theme, isPressed }) => css`
    border-radius: 12px;
    background-color: ${isPressed ? theme.colors.pale : theme.colors.white};
  `}
`;

type GroupSafewordRefreshProps = {
  isPressed: boolean;
};
