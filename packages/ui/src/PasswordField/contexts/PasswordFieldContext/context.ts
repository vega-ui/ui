'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { passwordFieldShape, passwordFieldWidget } from '@vega-ui/widgets/password-field';

export interface PasswordFieldContextState {
  handle: WidgetHandle<typeof passwordFieldShape>
  disabled?: boolean
}

export const [PasswordFieldProvider, usePasswordFieldContext] = createContext<PasswordFieldContextState>('PasswordFieldContext', {
  handle: createHandle(passwordFieldWidget, {}, { id: 'password-field' }),
})
