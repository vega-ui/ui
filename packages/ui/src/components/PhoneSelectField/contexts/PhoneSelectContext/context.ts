'use client';

import { KeyboardEvent, MouseEvent } from 'react';
import { createContext } from '@vega-ui/react-context';
import { CountryCode } from 'libphonenumber-js';

export interface PhoneSelectContextState {
  value: CountryCode | undefined
  onSelect: (e: KeyboardEvent | MouseEvent | null, value: CountryCode) => void
  size?: 'small' | 'medium' | 'large' | string
}

export const [PhoneSelectProvider, usePhoneSelectContext] = createContext<PhoneSelectContextState>('PhoneSelectContext', {
  value: undefined,
  onSelect: () => undefined,
  size: 'medium'
})