'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { modalDialogShape, modalDialogWidget } from '@vega-ui/widgets/modal-dialog';

export interface DialogContextState {
  handle: WidgetHandle<typeof modalDialogShape>
}

export const [DialogProvider, useDialogContext] = createContext<DialogContextState>('DialogContext', {
  handle: createHandle(modalDialogWidget, {}, { id: 'dialog' }),
})
