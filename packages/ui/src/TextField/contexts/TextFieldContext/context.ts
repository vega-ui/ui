'use client';

import { createContext } from '@vega-ui/react-kit/context';
import { TextFieldSize } from '../../types';

export interface TextFieldContextState {
  size?: TextFieldSize
  error?: boolean
}

export const [TextFieldProvider, useTextFieldContext] = createContext<TextFieldContextState>('PhoneFieldContext', {
  size: 'md',
  error: false,
})