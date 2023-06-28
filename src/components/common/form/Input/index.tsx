import * as i from 'types';
import * as React from 'react';

import { FormField } from '../FormField';
import { StyledInput, InputWrapper, InputIcon } from './styled';

export const Input = ({
  label,
  icon,
  error,
  editable = true,
  description,
  handleIconClick,
  value,
  onChangeText,
}: i.InputProps) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const isActive = isFocus || Boolean(value);
  const IconComponent = icon as React.ReactNode;

  return (
    <FormField {...{ label, error, description, isActive, hasValue: !!value }}>
      <InputWrapper>
        <StyledInput
          hasError={!!error}
          onChangeText={onChangeText}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          {...{ value, editable }}
        />
        {icon && (
          <InputIcon
            activeOpacity={0.6}
            hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
            readOnly={!handleIconClick}
            onPress={handleIconClick}
          >
            {IconComponent}
          </InputIcon>
        )}
      </InputWrapper>
    </FormField>
  );
};
