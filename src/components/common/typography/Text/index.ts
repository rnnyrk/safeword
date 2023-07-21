import type * as i from 'types';
import styled from 'styled-components/native';

export const Text = styled.Text<TextProps>`
  font-size: ${({ size }) => (size || 20) + 'px'};
  line-height: ${({ size }) => (size || 20) + 8 + 'px'};
  color: ${({ theme, color }) => theme.colors[color || 'black']};
  font-family: ${({ theme }) => theme.fonts.LexendDeca[800]};
  text-align: ${({ align }) => align || 'left'};
  margin-top: ${({ marginTop }) => (marginTop || 0) + 'px'};
  margin-right: ${({ marginRight }) => (marginRight || 0) + 'px'};
  margin-bottom: ${({ marginBottom }) => (marginBottom || 0) + 'px'};
`;

type TextProps = {
  align?: 'left' | 'center' | 'right';
  color?: i.ColorsFromTheme<'primary' | 'gray' | 'darkGray' | 'white'>;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  size?: 16 | 18 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64;
};
