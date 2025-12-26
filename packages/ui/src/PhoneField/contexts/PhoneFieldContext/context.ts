'use client';

import { createContext } from '@vega-ui/react-context';
import { InputEvent, Ref } from 'react';
import { CountryCode } from 'libphonenumber-js';

export interface PhoneFieldContextState {
  inputRef?: Ref<HTMLInputElement | null>
  onInput?(e: InputEvent<HTMLInputElement>): void
  onSelectValue?(value: CountryCode): void
  code?: CountryCode
}

export const [PhoneFieldProvider, usePhoneFieldContext] = createContext<PhoneFieldContextState>('PhoneFieldContext', {})