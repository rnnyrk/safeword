import * as i from 'types';
import styled from 'styled-components/native';

export const Text = styled.Text<TextProps>`
  font-size: ${({ size }) => size || 20 + 'px'};
  line-height: ${({ size }) => (size || 20) + 8 + 'px'};
  color: ${({ theme, color }) => theme.colors[color || 'black']};
  font-family: ${({ theme }) => theme.fonts.LexendDeca[800]};
`;

type TextProps = {
  color?: i.ColorsFromTheme<'primary'>;
  size?: 20 | 28 | 32 | 40 | 48 | 56 | 64;
};
