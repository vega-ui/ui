'use client';

import { Context, createContext } from 'react';
import { CountryCode } from 'libphonenumber-js';

export interface PhoneSelectContextState {
  value: CountryCode | undefined
  onSelect: (value: CountryCode) => void
  size?: 'small' | 'medium' | 'large'
}

export const defaultPhoneSelectContext: PhoneSelectContextState = {
  value: undefined,
  onSelect: () => undefined,
  size: 'medium'
}

export const PhoneSelectContext: Context<PhoneSelectContextState> = createContext(defaultPhoneSelectContext)