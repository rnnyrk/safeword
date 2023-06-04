import styled from 'styled-components/native';

export const CenterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CenterText = styled.Text`
  text-align: center;
  margin-top: 24px;
  font-size: 20px;
  line-height: 32px;
  font-family: ${({ theme }) => theme.fonts.LexendDeca[800]};
`;
