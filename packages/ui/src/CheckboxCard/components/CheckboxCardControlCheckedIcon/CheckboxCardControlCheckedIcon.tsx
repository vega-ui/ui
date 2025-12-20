import { FC } from 'react';
import { CheckboxCheckedIcon, CheckboxCheckedIconProps } from '../../../Checkbox';

export type CheckboxCardControlCheckedIconProps = CheckboxCheckedIconProps

export const CheckboxCardControlCheckedIcon: FC<CheckboxCardControlCheckedIconProps> = (props) => {
  return <CheckboxCheckedIcon {...props} />
}