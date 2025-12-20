import { FC } from 'react';
import { CheckboxIndicator, CheckboxIndicatorProps } from '../../../Checkbox';

export type CheckboxCardControlIndicatorProps = CheckboxIndicatorProps;

export const CheckboxCardControlIndicator: FC<CheckboxCardControlIndicatorProps> = (props) => {
  return <CheckboxIndicator {...props} />
}