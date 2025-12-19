import { FC } from 'react';
import { CheckboxHiddenInput, CheckboxHiddenInputProps } from '../../../Checkbox';

export type CheckboxCardControlHiddenInputProps = CheckboxHiddenInputProps

export const CheckboxCardControlHiddenInput: FC<CheckboxCardControlHiddenInputProps> = (props) => {
  return <CheckboxHiddenInput {...props} />
}