'use client';

import { createContext } from '../../../internals/context';
import { TextFieldSize } from '../../types';

export interface TextFieldContextState {
  size?: TextFieldSize
}

export const [TextFieldProvider, useTextFieldContext] = createContext<TextFieldContextState>('PhoneFieldContext', {
  size: 'md',
})