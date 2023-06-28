import * as i from 'types';
import * as React from 'react';

import { Input } from '../Input';
import { VisibilityToggle } from '../VisibilityToggle';

export const InputPassword: React.FC<i.InputProps> = ({ ...props }) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

  return (
    <Input
      secureTextEntry={secureTextEntry}
      handleIconClick={() => setSecureTextEntry(!secureTextEntry)}
      icon={<VisibilityToggle isToggled={!secureTextEntry} />}
      {...props}
    />
  );
};
