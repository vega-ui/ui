'use client';

import { createContext } from '@vega-ui/react-context';
import { CheckboxSize, CheckboxVariant } from '../../types';

export interface CheckboxContextState {
  size?: CheckboxSize
  variant?: CheckboxVariant
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  onChangeChecked?(value: boolean): void
}

export const [CheckboxProvider, useCheckboxContext] = createContext<CheckboxContextState>('CheckboxContext', {
  size: 'md',
  variant: 'primary',
  disabled: false,
})