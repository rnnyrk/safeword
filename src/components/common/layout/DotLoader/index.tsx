import type * as i from 'types';

import { Dot } from './Dot';
import { DotLoaderContainer } from './styled';

export const DotLoader = ({ color }: DotLoaderProps) => {
  return (
    <DotLoaderContainer>
      <Dot
        delay={0}
        color={color}
      />
      <Dot
        delay={220}
        color={color}
      />
      <Dot
        delay={440}
        color={color}
      />
    </DotLoaderContainer>
  );
};

export type DotLoaderProps = {
  color?: i.ColorsFromTheme<'primary' | 'primaryLight' | 'gray' | 'darkGray' | 'white' | 'black'>;
};
