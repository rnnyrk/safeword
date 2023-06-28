import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Platform } from 'react-native';

import { ArrowDownSvg } from 'common/svg';

import { FormField } from '../FormField';
import { ExtendedText, IconContainer, HiddenInput } from './styled';

export const InputSelect: React.FC<InputSelectProps> = ({
  selected,
  label,
  options,
  placeholder,
  description,
  onChange,
}) => {
  const pickerRef = React.useRef<RNPickerSelect>(null);
  const [active, setActive] = React.useState(false);

  const handleChange = (value: any) => {
    setActive(!!value);
    onChange(value);
  };

  const openPicker = () => {
    if (Platform.OS === 'android') {
      // @ts-ignore
      pickerRef.current?.focus?.();
    } else {
      pickerRef.current?.togglePicker(true);
    }
  };

  return (
    <>
      {/* Custom solution. See https://github.com/lawnstarter/react-native-picker-select/issues/424#issuecomment-851065179
      // @ts-ignore */}
      <RNPickerSelect
        value={selected?.value}
        onValueChange={handleChange}
        items={options}
        {...(Platform.OS === 'ios' && {
          ref: pickerRef,
        })}
        {...(Platform.OS === 'android' && {
          pickerProps: {
            ref: pickerRef,
          },
        })}
        placeholder={{
          label: placeholder,
          value: null,
        }}
      >
        <HiddenInput />
      </RNPickerSelect>
      <FormField
        onPress={() => openPicker()}
        isActive={active}
        hasValue={!!selected?.value}
        {...{ label, description }}
      >
        <ExtendedText>{selected?.label}</ExtendedText>
        <IconContainer>
          <ArrowDownSvg width={16} height={16} />
        </IconContainer>
      </FormField>
    </>
  );
};

type Option = {
  label: string;
  value: string;
};

type InputSelectProps = {
  selected: null | Option;
  label: string;
  placeholder?: string;
  options: Option[];
  description?: string;
  onChange: (value: string) => void;
};
