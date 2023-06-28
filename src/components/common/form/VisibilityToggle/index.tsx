import * as React from 'react';

import { ToggleContainer, ToggleText } from './styled';

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ isToggled }) => {
  return (
    <ToggleContainer>
      <ToggleText>{isToggled ? 'Hide' : 'Show'}</ToggleText>
    </ToggleContainer>
  );
};

type VisibilityToggleProps = {
  isToggled?: boolean;
};
