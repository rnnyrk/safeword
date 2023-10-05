import Svg, { Path } from 'react-native-svg';

import { SvgWrapper } from './styled';

export const Check = ({ fill }: CheckProps) => (
  <SvgWrapper>
    <Svg
      width={20}
      height={15}
      viewBox="0 0 18 13"
    >
      <Path
        d="M6.832 9.597l-5.13-5.046L.298 5.977l6.533 6.426 10.87-10.69L16.298.287z"
        fillRule="nonzero"
        fill={fill}
      />
    </Svg>
  </SvgWrapper>
);

type CheckProps = {
  style?: any;
  fill?: string;
  width?: number;
  height?: number;
};
