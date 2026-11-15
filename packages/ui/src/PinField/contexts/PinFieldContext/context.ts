'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { PinFieldSize } from '../../types';
import { pinFieldShape, pinFieldWidget } from '@vega-ui/widgets/pin-field';

export interface PinFieldContextState {
  handle: WidgetHandle<typeof pinFieldShape>
  size?: PinFieldSize
  placeholder?: string
  disabled?: boolean
  maxLength: number
}

export const [PinFieldProvider, usePinFieldContext] = createContext<PinFieldContextState>('PinFieldContext', {
  handle: createHandle(pinFieldWidget, { maxLength: 4, mask: undefined, disabled: false }, { id: 'pin-field' }),
  size: 'md',
  disabled: false,
  maxLength: 4,
})
