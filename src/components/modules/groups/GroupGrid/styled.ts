import styled from 'styled-components/native';

export const GroupGridContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;
