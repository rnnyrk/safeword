import Svg, { Path } from 'react-native-svg';

import { SvgWrapper } from './styled';

export const Delete = ({
  fill,
  width = 24,
  height = 24,
  $position = 'static',
  style,
}: DeleteProps) => (
  <SvgWrapper
    $position={$position}
    style={style}
  >
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
    >
      <Path
        d="M13.495.505a.7.7 0 01.074.903l-.074.087L7.989 7l5.506 5.505a.7.7 0 01-.903 1.064l-.087-.074L7 7.989l-5.505 5.506a.7.7 0 01-1.064-.903l.074-.087L6.011 7 .505 1.495A.7.7 0 011.408.431l.087.074L7 6.011 12.505.505a.7.7 0 01.99 0z"
        fillRule="nonzero"
        fill={fill}
      />
    </Svg>
  </SvgWrapper>
);

type DeleteProps = {
  style?: any;
  fill?: string;
  $position?: 'static' | 'absolute';
  width?: number;
  height?: number;
};
