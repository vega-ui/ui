'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface DialogContextState {
  open: boolean
  changeOpen: (value: boolean) => void
}

export const [DialogProvider, useDialogContext] = createContext<DialogContextState>('DialogContext', {
  open: false,
  changeOpen: () => undefined,
})
