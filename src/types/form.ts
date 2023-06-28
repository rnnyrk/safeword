import * as React from 'react';
import { FieldError, RegisterOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native';

export type FormFieldProps = {
  name?: string;
  children?: React.ReactNode;
  label?: string;
  description?: string;
  direction?: 'horizontal' | 'vertical';
  error?: FieldError;
};

export type DefaultInputProps = Partial<TextInputProps> & {
  onChange?: ((text: string) => void) | undefined;
  onChangeText?: (text: string) => void;
  defaultValue?: string;
  name?: string;
  editable?: boolean;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  icon?: React.ReactNode;
  handleIconClick?: ((event: any) => void) | undefined;
  error?: FieldError;
};

export type CheckboxItemType = {
  label: string;
  value: string;
};

export type InputProps = DefaultInputProps & FormFieldProps;

export type SelectOption = {
  label: string;
  value: string;
};
