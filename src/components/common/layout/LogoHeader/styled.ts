import styled from 'styled-components/native';

export const LogoHeaderContainer = styled.View<LogoHeaderContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px;
  paddingTop: ${({ paddingTop }) => paddingTop + 'px'};
  background-color: ${({ theme }) => theme.colors.white};
`;

type LogoHeaderContainerProps ={
  paddingTop: number
};
