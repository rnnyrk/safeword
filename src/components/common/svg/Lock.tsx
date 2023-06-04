import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgWrapper } from './styled';

export const Lock = ({
  fill = '#000000',
  width = 20,
  height = 20,
  $position = 'static',
}: LockProps) => (
  <SvgWrapper $position={$position}>
    <Svg
      width={width}
      height={height}
      viewBox="0 0 500 500"
    >
      <Path
        fill={fill}
        d="M318.1 259.5c32.8-21.9 54.5-59.3 54.5-101.7 0-67.5-54.7-122.3-122.3-122.3-67.5 0-122.3 54.7-122.3 122.3 0 42.4 21.6 79.8 54.5 101.7l-28.7 175.3c-2.5 15.5 9.4 29.5 25.1 29.5h142.8c15.7 0 27.6-14 25.1-29.5l-28.7-175.3z"
      />
    </Svg>
  </SvgWrapper>
);

type LockProps = {
  fill?: string;
  width?: number;
  height?: number;
  $position?: 'static' | 'absolute';
};
