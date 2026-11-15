'use client';

import { phoneNumbering } from '@vega-ui/i18n';
import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { phoneFieldShape, phoneFieldWidget } from '@vega-ui/widgets/phone-field';

export interface PhoneFieldContextState {
  handle: WidgetHandle<typeof phoneFieldShape>
  disabled?: boolean
}

export const [PhoneFieldProvider, usePhoneFieldContext] = createContext<PhoneFieldContextState>('PhoneFieldContext', {
  handle: createHandle(phoneFieldWidget, { strict: true, numbering: phoneNumbering }, { id: 'phone-field' }),
})
