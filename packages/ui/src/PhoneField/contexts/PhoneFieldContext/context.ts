'use client';

import { createContext } from '@vega-ui/react-context';
import { Ref } from 'react';
import { CountryCode } from 'libphonenumber-js';

export interface PhoneFieldContextState {
  inputRef?: Ref<HTMLInputElement | null>
  onSelectValue?(value: CountryCode): void
  phone?: string
  changePhone?(value: string): void
  code?: CountryCode
}

export const [PhoneFieldProvider, usePhoneFieldContext] = createContext<PhoneFieldContextState>('PhoneFieldContext', {})