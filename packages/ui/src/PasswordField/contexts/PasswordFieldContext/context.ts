'use client';

import { createContext } from '@vega-ui/react-context';
import { RefObject } from 'react';

export interface PasswordFieldContextState {
  shown?: boolean
  disabled?: boolean
  inputRef?: RefObject<HTMLInputElement | null>
  toggleShow?(): void
}

export const [PasswordFieldProvider, usePasswordFieldContext] = createContext<PasswordFieldContextState>('PhoneFieldContext', {
  shown: false,
})