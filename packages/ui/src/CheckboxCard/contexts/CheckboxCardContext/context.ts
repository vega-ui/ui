'use client';

import { CheckboxCardSize, CheckboxVariant } from '../../types';
import { createContext } from '@vega-ui/react-context';

export interface CheckboxCardContextState {
  size: CheckboxCardSize
  variant: CheckboxVariant
  checked?: boolean
  onChangedChecked?(value: boolean): void
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
}

export const [CheckboxCardProvider, useCheckboxCardContext] = createContext<CheckboxCardContextState>('CheckboxCardContext', {
  size: 'md',
  variant: 'primary',
  disabled: false,
})