import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { type DotLoaderProps } from '.';

export const DotLoaderContainer = styled.View`
  width: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DotContainer = styled(Animated.View)<DotContainerProps>`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  margin-right: 3px;
  background-color: ${({ theme, color }) => theme.colors[color || 'white']};
`;

type DotContainerProps = Pick<DotLoaderProps, 'color'>;
