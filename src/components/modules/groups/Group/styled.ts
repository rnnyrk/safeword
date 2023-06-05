import styled from 'styled-components/native';

export const GroupContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const GroupContent = styled.View`
  position: relative;
  z-index: 10;
  display: flex;
  height: 400px;
  padding-top: 80px;
  /* background: ${({ theme }) => theme.colors.gray}; */
`;
