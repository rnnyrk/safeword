import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgWrapper } from './styled';

export const Bolt = ({ fill = '#000000', width = 20, height = 20, $position = 'static' }: BoltProps) => (
  <SvgWrapper $position={$position}>
    <Svg width={width} height={height} viewBox="0 0 28 35">
      <Path fill={fill} d="M27.5 12.9l-25 24.3L10 19.4H0L7.5 0h20L15 12.9z" />
    </Svg>
  </SvgWrapper>
);

type BoltProps = {
  fill?: string;
  width?: number;
  height?: number;
  $position?: 'static' | 'absolute';
};
