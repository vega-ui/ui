'use client';

import { createContext } from '@vega-ui/react-context';

export interface DialogContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  fluid?: boolean
}

export const [DialogProvider, useDialogContext] = createContext<DialogContextState>('DialogContext', {
  open: false,
  changeOpen: () => undefined,
})
