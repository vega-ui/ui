import { FC } from 'react';
import { CheckboxInput, CheckboxInputProps } from '../../../Checkbox';

export type CheckboxCardControlInputProps = CheckboxInputProps

export const CheckboxCardControlInput: FC<CheckboxCardControlInputProps> = (props) => {
  return <CheckboxInput {...props} />
}